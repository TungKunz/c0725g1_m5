import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {editCustomer, findAllCustomer, findByIdCustomer} from "../service/CustomerService.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {editContract, findByIdContract} from "../service/ContractService.js";
import {findAllEmployees, findByIdEmployee} from "../service/EmployeeService.js";

const EditContract = () =>{
    const [edit, setEdit] = useState({});
    const [customerList,setCustomerList] = useState([]);
    const [customer,setCustomer] = useState([]);
    const [employeeList,setEmployeeList] = useState([]);
    const [employee,setEmployee] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetchData= async ()=>{
            let detail = await findByIdContract(id);
            setEdit(detail);
            let customerList = await findAllCustomer();
            setCustomerList(customerList);
            let employeeList = await findAllEmployees();
            setEmployeeList(employeeList);
            let customer = await findByIdCustomer(detail.customerId);
            setCustomer(customer);
            let employee = await findByIdEmployee(detail.employeeId)
            setEmployee(employee);

        }
        fetchData()
    }, []);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const status = await editContract(values);
            if (status) {
                toast.success("Sửa hợp đồng thành công");
                navigate("/");
            } else {
                toast.error("Sửa thông tin thất bại");
            }
        } catch (error) {
            toast.error("Sửa thông tin thất bại");
        }
    };
    return(
        <>
            <Formik
                initialValues={edit}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >

                <Form className="border p-4 shadow-sm rounded bg-light">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Mã hợp đồng</label>
                            <Field name="contractNumber" type="text" className="form-control" />
                            <ErrorMessage name="contractNumber" component="span" className="text-danger small" />
                        </div>
                        <div className={'col-md-4 mb-3'}>
                            <label className={'form-label'}>Ngày bắt đầu</label>
                            <Field type={'date'} name={'startDate'} required/>
                            <ErrorMessage name={'startDate'} component={'span'}></ErrorMessage>
                        </div>
                        <div className={'col-md-4 mb-3'}>
                            <label className={'form-label'}>Ngày kết thúc</label>
                            <Field type={'date'} name={'endDate'} required/>
                            <ErrorMessage name={'endDate'} component={'span'}></ErrorMessage>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Chọn khách hàng</label>
                            <Field as="select" name="customerId" className="form-select">
                                {customerList.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="customerTypeId" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Chọn nhân viên</label>
                            <Field as="select" name="employeeId" className="form-select">
                                {employeeList.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="customerTypeId" component="span" className="text-danger small" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">Address</label>
                            <Field name="totalPayment" type="number" className="form-control" />
                            <ErrorMessage name="totalPayment" component="span" className="text-danger small" />
                        </div>

                        <div className="col-md-12 mt-3 d-flex gap-2">
                            <Button variant="success" type="submit">Sửa thông tin khách hàng</Button>
                            <Button variant="secondary" onClick={() => navigate("/")}>Hủy</Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
export default EditContract;