import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {findFacilityById} from "../service/FacilitiesService.js";
import {findByIdFacilitiesTypes} from "../service/FacilitiesTypesService.js";
import {findByIdRentTypes} from "../service/RentTypesService.js";
import {Link} from "react-router-dom";

const DetailFacilities = () => {
    const [detail, setDetail] = useState({});
    const [facilityTypes, setFacilityTypes] = useState({});
    const [rentTypes, setRentTypes] = useState({});
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            let detailFacilities = await findFacilityById(id);
            setDetail(detailFacilities);
            if (detailFacilities) {
                let facilityTypeData = await findByIdFacilitiesTypes(detailFacilities.facilityTypeId);
                setFacilityTypes(facilityTypeData);
                let rentTypeData = await findByIdRentTypes(detailFacilities.rentTypeId);
                setRentTypes(rentTypeData);
            }
        }
        fetchData()
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3>Chi tiết dịch vụ: {detail.name}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Diện tích:</strong> {detail.area} m²</p>
                            <p><strong>Chi phí thuê:</strong> {detail.cost?.toLocaleString('vi-VN')} VNĐ</p>
                            <p><strong>Số người tối đa:</strong> {detail.maxPeople}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Loại dịch vụ:</strong> {facilityTypes?.name}</p>
                            <p><strong>Kiểu thuê:</strong> {rentTypes?.name}</p>
                        </div>
                    </div>

                    <div className={"row"}>
                        {facilityTypes.id === 1 && (

                            <div className={"col-md-6"}>
                                <p><strong>Tiêu chuẩn phòng</strong> {detail?.standard}</p>
                                <p><strong>Mô tả tiện nghi khác</strong> {detail?.description}</p>
                                <p><strong>Số tầng</strong> {detail?.floors}</p>
                                <p><strong>Diện tích hồ bơi</strong> {detail?.poolArea}</p>
                            </div>

                        )}
                        {facilityTypes.id === 2 &&(
                            <div className={"col-md-6"}>
                                <p><strong>Tiêu chuẩn phòng</strong> {detail?.standard}</p>
                                <p><strong>Mô tả tiện nghi khác</strong> {detail?.description}</p>
                                <p><strong>Số tầng</strong> {detail?.floors}</p>
                            </div>
                        )}
                        {facilityTypes.id === 3 &&(
                            <div className={"col-md-6"}>
                                <p><strong>Dịch vụ miễn phí đi kèm: </strong> {detail?.freeService}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-3">
                        <Link to="/" className="btn btn-secondary">Quay lại danh sách</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailFacilities;