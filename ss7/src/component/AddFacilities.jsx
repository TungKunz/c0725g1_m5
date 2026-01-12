import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { findAllFacilitiesTypes } from "../service/FacilitiesTypesService.js";
import { findAllRentTypes } from "../service/RentTypesService.js";
import { addFacilities } from "../service/FacilitiesService.js";
import { toast } from "react-toastify";

const AddFacilities = () => {
    const [facility, setFacility] = useState({
        id: '', name: '', area: '', cost: '', facilityTypeId: 1, rentTypeId: 3,
        standard: '', poolArea: '', floors: '', freeService: '', maxPeople: '', description: ''
    });
    const [facilityTypes, setFacilityTypes] = useState([]);
    const [rentTypes, setRentTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDynamicData = async () => {
            const fTypes = await findAllFacilitiesTypes();
            const rTypes = await findAllRentTypes();
            setFacilityTypes(fTypes);
            setRentTypes(rTypes);
        };
        fetchDynamicData();
    }, []);

    // 1. Validation Schema động với Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Tên không được để trống")
            .matches(/^[A-Z].*$/, "Tên phải bắt đầu bằng chữ hoa"),
        area: Yup.number().required("Bắt buộc").positive("Phải là số dương"),
        cost: Yup.number().required("Bắt buộc").min(0, "Không được âm"),
        rentTypeId: Yup.number().required("Bắt buộc"),

        // Validate theo điều kiện
        floors: Yup.number().when('facilityTypeId', {
            is: (val) => val === 1 || val === 2,
            then: () => Yup.number().required("Số tầng là bắt buộc").positive("Phải là số dương"),
        }),
        poolArea: Yup.number().when('facilityTypeId', {
            is: 1,
            then: () => Yup.number().required("Diện tích hồ bơi là bắt buộc").positive("Phải là số dương"),
        }),
        freeService: Yup.string().when('facilityTypeId', {
            is: 3,
            then: () => Yup.string().required("Dịch vụ miễn phí là bắt buộc"),
        }),
        maxPeople: Yup.number().required("Bắt buộc").positive("Phải là số dương").integer("Phải là số nguyên"),
        description: Yup.string().max(255, "Mô tả không quá 255 ký tự")
    });

    const handleSubmit = async (values) => {
        let dataSubmit = {
            name: values.name,
            area: values.area,
            cost: values.cost,
            facilityTypeId: values.facilityTypeId,
            rentTypeId: values.rentTypeId,
            maxPeople: values.maxPeople
        };

        if (values.facilityTypeId === 1) { // Villa
            dataSubmit = { ...dataSubmit, standard: values.standard, floors: values.floors, poolArea: values.poolArea, description: values.description };
        } else if (values.facilityTypeId === 2) { // House
            dataSubmit = { ...dataSubmit, standard: values.standard, floors: values.floors, description: values.description };
        } else if (values.facilityTypeId === 3) { // Room
            dataSubmit = { ...dataSubmit, freeService: values.freeService };
        }

        try {
            await addFacilities(dataSubmit).then(status => {
                if (status) {
                    toast.success("Thêm mới thành công");
                } else {
                    toast.error("Thêm mới thất bại");
                }
                navigate("/");
            }
            );


        } catch (error) {
            toast.error("Thêm mới thất bại");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary">Thêm mới Dịch vụ</h2>
            <Formik
                initialValues={facility}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className="border p-4 shadow-sm rounded bg-light">
                        <div className={'row'}>
                            <div className={'col-md-4 mb-3'}>
                                <label className={'form-label fw-bold'}>Loại dịch vụ</label>
                                <Field as="select" name="facilityTypeId" className="form-select"
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        setFieldValue('facilityTypeId', val);
                                    }}>
                                    {facilityTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </Field>
                            </div>

                            <div className={'col-md-4 mb-3'}>
                                <label className={'form-label fw-bold'}>Kiểu thuê</label>
                                <Field as="select" name="rentTypeId" className="form-select"
                                    onChange={(e) => {
                                        setFieldValue('rentTypeId', parseInt(e.target.value));
                                    }}>
                                    {rentTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="rentTypeId" component="span" className="text-danger small" />
                            </div>

                            <div className={'col-md-4 mb-3'}>
                                <label className={'form-label fw-bold'}>Tên dịch vụ</label>
                                <Field name="name" type="text" className="form-control" />
                                <ErrorMessage name="name" component="span" className="text-danger small" />
                            </div>

                            <div className={'col-md-4 mb-3'}>
                                <label className={'form-label fw-bold'}>Diện tích (m2)</label>
                                <Field name="area" type="number" className="form-control" />
                                <ErrorMessage name="area" component="span" className="text-danger small" />
                            </div>

                            <div className={'col-md-4 mb-3'}>
                                <label className={'form-label fw-bold'}>Chi phí thuê</label>
                                <Field name="cost" type="number" className="form-control" />
                                <ErrorMessage name="cost" component="span" className="text-danger small" />
                            </div>
                            <div className={'col-md-4 mb-3'}>
                                <label className={'form-label fw-bold'}>Số lượng người tối đa</label>
                                <Field name="maxPeople" type="number" className="form-control" />
                                <ErrorMessage name="maxPeople" component="span" className="text-danger small" />
                            </div>
                            {(values.facilityTypeId === 1 || values.facilityTypeId === 2) && (
                                <>
                                    <div className={'col-md-4 mb-3'}>
                                        <label className={'form-label fw-bold'}>Tiêu chuẩn phòng</label>
                                        <Field name="standard" type="text" className="form-control" />
                                    </div>
                                    <div className={'col-md-4 mb-3'}>
                                        <label className={'form-label fw-bold'}>Số tầng</label>
                                        <Field name="floors" type="number" className="form-control" />
                                        <ErrorMessage name="floors" component="span" className="text-danger small" />
                                    </div>
                                    <div className={'col-md-4 mb-3'}>
                                        <label className={'form-label fw-bold'}>Mô tả tiện nghi khác</label>
                                        <Field name="description" type="text" className="form-control" />
                                        <ErrorMessage name="description" component="span" className="text-danger small" />
                                    </div>
                                </>
                            )}

                            {values.facilityTypeId === 1 && (
                                <div className={'col-md-4 mb-3'}>
                                    <label className={'form-label fw-bold'}>Diện tích hồ bơi</label>
                                    <Field name="poolArea" type="number" className="form-control" />
                                    <ErrorMessage name="poolArea" component="span" className="text-danger small" />
                                </div>
                            )}

                            {values.facilityTypeId === 3 && (
                                <div className={'col-md-4 mb-3'}>
                                    <label className={'form-label fw-bold'}>Dịch vụ miễn phí</label>
                                    <Field name="freeService" type="text" className="form-control" />
                                    <ErrorMessage name="freeService" component="span" className="text-danger small" />
                                </div>
                            )}

                            <div className={'col-md-12 mt-3 d-flex gap-2'}>
                                <Button variant={'success'} type={'submit'}>Thêm mới</Button>
                                <Button variant={'secondary'} onClick={() => navigate("/")}>Hủy</Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddFacilities;