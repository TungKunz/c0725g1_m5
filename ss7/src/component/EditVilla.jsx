import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { findAllRentTypes } from "../service/RentTypesService.js";
import { updateFacility } from "../service/FacilitiesService.js";
import { toast } from "react-toastify";

const EditVilla = ({ facility }) => {
    const [rentTypes, setRentTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentTypes = async () => {
            const rTypes = await findAllRentTypes();
            setRentTypes(rTypes);
        };
        fetchRentTypes();
    }, []);

    const villaSchema = Yup.object().shape({
        name: Yup.string()
            .required("Tên không được để trống")
            .matches(/^[A-Z].*$/, "Tên phải bắt đầu bằng chữ hoa"),
        area: Yup.number().required("Bắt buộc").positive("Phải là số dương"),
        cost: Yup.number().required("Bắt buộc").min(0, "Không được âm"),
        rentTypeId: Yup.number().required("Bắt buộc"),
        maxPeople: Yup.number().required("Bắt buộc").positive("Phải là số dương").integer("Phải là số nguyên"),
        standard: Yup.string().required("Tiêu chuẩn phòng là bắt buộc"),
        floors: Yup.number().required("Số tầng là bắt buộc").positive("Phải là số dương"),
        poolArea: Yup.number().required("Diện tích hồ bơi là bắt buộc").positive("Phải là số dương"),
        description: Yup.string().max(255, "Mô tả không quá 255 ký tự")
    });

    const handleSubmit = async (values) => {
        const dataSubmit = { ...values, facilityTypeId: 1 };
        try {
            const status = await updateFacility(facility.id, dataSubmit);
            if (status) {
                toast.success("Cập nhật Villa thành công");
                navigate("/");
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (error) {
            toast.error("Cập nhật thất bại");
        }
    };

    if (!facility) return null;

    return (
        <Formik
            initialValues={{
                name: facility.name || '',
                area: facility.area || '',
                cost: facility.cost || '',
                rentTypeId: facility.rentTypeId || 3,
                maxPeople: facility.maxPeople || '',
                standard: facility.standard || '',
                floors: facility.floors || '',
                poolArea: facility.poolArea || '',
                description: facility.description || ''
            }}
            validationSchema={villaSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            <Form className="border p-4 shadow-sm rounded bg-light">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Tên Villa</label>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Diện tích (m2)</label>
                        <Field name="area" type="number" className="form-control" />
                        <ErrorMessage name="area" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Chi phí thuê</label>
                        <Field name="cost" type="number" className="form-control" />
                        <ErrorMessage name="cost" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Kiểu thuê</label>
                        <Field as="select" name="rentTypeId" className="form-select">
                            {rentTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="rentTypeId" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Số lượng người tối đa</label>
                        <Field name="maxPeople" type="number" className="form-control" />
                        <ErrorMessage name="maxPeople" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Tiêu chuẩn phòng</label>
                        <Field name="standard" type="text" className="form-control" />
                        <ErrorMessage name="standard" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Số tầng</label>
                        <Field name="floors" type="number" className="form-control" />
                        <ErrorMessage name="floors" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Diện tích hồ bơi</label>
                        <Field name="poolArea" type="number" className="form-control" />
                        <ErrorMessage name="poolArea" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label fw-bold">Mô tả tiện nghi khác</label>
                        <Field name="description" as="textarea" className="form-control" />
                        <ErrorMessage name="description" component="span" className="text-danger small" />
                    </div>
                    <div className="col-md-12 mt-3 d-flex gap-2">
                        <Button variant="primary" type="submit">Cập nhật Villa</Button>
                        <Button variant="secondary" onClick={() => navigate("/")}>Hủy</Button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default EditVilla;
