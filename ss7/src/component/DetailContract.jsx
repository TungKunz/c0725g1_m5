import {useEffect, useState} from "react";
import { useParams } from "react-router";
import {findByIdCustomer} from "../service/CustomerService.js";
import {Link} from "react-router-dom";
import {findByIdContract} from "../service/ContractService.js";
import {findByIdEmployee} from "../service/EmployeeService.js";
import {findFacilityById} from "../service/FacilitiesService.js";

const DetailContract = ()=>{
    const [detail, setDetail] = useState({});
    const [customer, setCustomer] = useState({});
    const [employee, setEmployee] = useState({});
    const [facility, setFacility] = useState({});
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            let detailContract = await findByIdContract(id);
            setDetail(detailContract);
            if (detailContract) {
                let customer = await findByIdCustomer(detailContract.customerId);
                setCustomer(customer);
                let employee = await findByIdEmployee(detailContract.employeeId)
                setEmployee(employee);
                let facility = await findFacilityById(detailContract.facilityId)
                setFacility(facility);
            }
        }
        fetchData()
    }, [id]);

    return (
        <div className="container mt-5">

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3>Chi tiết Hợp đồng: {detail.contractNumber}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Ngày bắt đầu</strong> {new Date(detail.startDate).toLocaleDateString("vi-VN")}</p>
                            <p><strong>Ngày kết thúc</strong> {new Date(detail.startDate).toLocaleDateString("vi-VN")}</p>
                            <p><strong>Tên khách hàng:</strong> {customer.name}</p>
                            <p><strong>Tên dịch vụ:</strong> {facility.name}</p>
                            <p><strong>Tên nhân viên phụ trách </strong> {employee.name}</p>
                            <p><strong>Tổng tiền</strong> {detail.totalPayment}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Link to="/" className="btn btn-secondary">Quay lại danh sách</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailContract;