import {useEffect, useState} from "react";
import {useParams} from "react-router";

import {Link} from "react-router-dom";
import {findByIdCustomer} from "../service/CustomerService.js";

const DetailCustomer = () =>{
    const [detail, setDetail] = useState({});
    const [customerTypeList,setCustomerTypeList] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            let detailCustomer = await findByIdCustomer(id);
            setDetail(detailCustomer);
            if (detailCustomer) {
                let type = await findByIdCustomer(detailCustomer.customerTypeId);
                setCustomerTypeList(type);
            }
        }
        fetchData()
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3>Chi tiết Khách hàng: {detail.name}</h3>
                </div>
                {/*"id": 1,*/}
                {/*"name": "Nguyễn Văn An",*/}
                {/*"birthday": "1990-01-01",*/}
                {/*"gender": "Nam",*/}
                {/*"idCard": "123456789",*/}
                {/*"phone": "0901234567",*/}
                {/*"email": "an@gmail.com",*/}
                {/*"customerTypeId": 1,*/}
                {/*"address": "Đà Nẵng"*/}
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Ngày sinh</strong> {new Date(detail.birthday).toLocaleDateString("vi-VN")}</p>
                            <p><strong>Giới tính:</strong> {detail.gender}</p>
                            <p><strong>CCCD</strong> {detail.idCard}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Số điện thoại</strong> {detail.phone}</p>
                            <p><strong>Email:</strong> {detail.email}</p>
                            <p><strong>Loại khách hàng:</strong> {customerTypeList?.name}</p>
                            <p><strong>Địa chỉ</strong> {detail.address}</p>
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
export default DetailCustomer;
