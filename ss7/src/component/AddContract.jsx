import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {addContract, findByIdContract} from "../service/ContractService.js";
import {addFacilities, findFacilityById} from "../service/FacilitiesService.js";
import {findAllEmployees} from "../service/EmployeeService.js";
import {addCustomer, findAllCustomer} from "../service/CustomerService.js";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import img from "../assets/OIP.webp";
const AddContract = ()=>{
    const [newContract,setNewContract] = useState({});
    const [facility,setFacility] = useState({});
    const [employeeList, setEmployeeList]=useState([]);
    const [customerList, setCustomerList]=useState([]);

    const {id}=useParams();
    useEffect(() => {
        const fetData = async ()=>{
            let facility = await findFacilityById(id);
            setFacility(facility);
            let employee = await findAllEmployees();
            setEmployeeList(employee);
            let customer = await findAllCustomer();
            setCustomerList(customer)
        }
        fetData();
    }, []);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        const dataSubmit = { ...values, facilityId: facility.id };
        try {
            const status = await addContract(dataSubmit);
            if (status) {
                toast.success("Thêm mới Hợp Đồng thành công");
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
            <div className="container mt-4">
                <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg-4" key={facility.id}>
                            <div className="h-100 shadow-sm">
                                <div>
                                    <h3>{facility.name}</h3>
                                    <h5>
                                        Diện tích: {facility.area} m2 <br />
                                        Chi phí: {facility.cost?.toLocaleString('vi-VN')} VNĐ
                                    </h5>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <Formik initialValues={newContract} onSubmit={handleSubmit}>
                <Form className="border p-4 shadow-sm rounded bg-light">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Mã Hợp Đồng</label>
                            <Field name="contractNumber" type="text" className="form-control" />
                            <ErrorMessage name="contractNumber" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Tên Khách hàng</label>
                            <Field as="select" name="customerId" className="form-select">
                                {customerList.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="customerId" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Tên Nhân Viên phụ trách</label>
                            <Field as="select" name="employeeId" className="form-select">
                                {employeeList.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="employeeId" component="span" className="text-danger small" />
                        </div>
                        <div className={'col-md-4 mb-3'}>
                            <label className={'form-label'}>Ngày bắt đầu</label>
                            <Field type={'date'} name={'startDate'} required/>
                            {/*<ErrorMessage name={'startDate'} component={'span'}></ErrorMessage>*/}
                        </div>
                        <div className={'col-md-4 mb-3'}>
                            <label className={'form-label'}>Ngày kết thúc</label>
                            <Field type={'date'} name={'endDate'} required/>
                            {/*<ErrorMessage name={'endDate'} component={'span'}></ErrorMessage>*/}
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Tổng tiền</label>
                            <Field name="totalPayment" type="number" className="form-control" />
                            <ErrorMessage name="totalPayment" component="span" className="text-danger small" />
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
export default AddContract;