import {useEffect, useState} from "react";
import {findAllCustomerTypes} from "../service/CustomerTypesService.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import * as Yup from "yup";
import {addFacilities} from "../service/FacilitiesService.js";
import {toast} from "react-toastify";
import {addCustomer} from "../service/CustomerService.js";
import {useNavigate} from "react-router-dom";

const AddCustomer = () => {
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        birthday: "",
        gender: "",
        idCard: "",
        phone: "",
        email: "",
        customerTypeId: 4,
        address: ""
    });
    const [customerTypeList,setCustomerTypeList] = useState([]);
    useEffect(() => {
        const fetchData= async ()=>{
            let list = await findAllCustomerTypes();
            setCustomerTypeList(list);
        }
        fetchData()
    }, []);
    const validate = Yup.object({
        name:Yup.string().required("Yêu cầu nhập tên")
            .matches(/^([A-ZÀ-Ỹ][a-zà-ỹ]*)(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,"Tên phải đúng định dạng"),
        phone: Yup.string()
            .required("Yêu cầu nhập số điện thoại")
            .matches(/^(0(90|91)\d{7}|\(84\)\+(90|91)\d{7})$/, "SĐT phải là 090xxxxxxx/091xxxxxxx hoặc (84)+90xxxxxxx/(84)+91xxxxxxx"),

        idCard: Yup.string()
            .required("Yêu cầu nhập CMND/CCCD")
            .matches(/^(\d{9}|\d{12})$/, "CMND/CCCD phải có 9 số hoặc 12 số"),
        email: Yup.string()
            .required("Yêu cầu nhập email")
            .email("Email không đúng định dạng"),
        birthday: Yup.date()
            .typeError("Ngày sinh không hợp lệ")
            .required("Yêu cầu chọn ngày sinh")

    })
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const status = await addCustomer(values);
            if (status) {
                toast.success("Thêm mới khách hàng thành công");
                navigate("/");
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            toast.error("Thêm mới thất bại");
        }
    };
    return(
        <>
            <Formik
                initialValues={newCustomer}
                validationSchema={validate}
                onSubmit={handleSubmit}
            >
                <Form className="border p-4 shadow-sm rounded bg-light">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Tên Khách hàng</label>
                            <Field name="name" type="text" className="form-control" />
                            <ErrorMessage name="name" component="span" className="text-danger small" />
                        </div>
                        <div className={'col-md-4 mb-3'}>
                            <label className={'form-label'}>Ngày sinh</label>
                            <Field type={'date'} name={'birthday'} required/>
                            {/*<ErrorMessage name={'birthday'} component={'span'}></ErrorMessage>*/}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Giới tính</label>
                            <Field name="gender" type="text" className="form-control" />
                            <ErrorMessage name="gender" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">CCCD</label>
                            <Field name="idCard" type="text" className="form-control" />
                            <ErrorMessage name="idCard" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Số điện thoại</label>
                            <Field name="phone" type="text" className="form-control" />
                            <ErrorMessage name="phone" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <Field name="email" type="text" className="form-control" />
                            <ErrorMessage name="email" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Address</label>
                            <Field name="address" type="text" className="form-control" />
                            <ErrorMessage name="address" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Loại khách hàng</label>
                            <Field as="select" name="customerTypeId" className="form-select">
                                {customerTypeList.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="customerTypeId" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-12 mt-3 d-flex gap-2">
                            <Button variant="success" type="submit">Thêm mới Khách hàng</Button>
                            <Button variant="secondary" onClick={() => navigate("/")}>Hủy</Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
export default AddCustomer;