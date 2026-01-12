import { useEffect, useState } from "react";
import {deleteByIdFacilities, findAllFacilities} from "../service/FacilitiesService.js";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import img from '../assets/OIP.webp';
import DeleteModal from "./DeleteModal.jsx";
const ListFacilities = () => {
    const [listFacilities, setListFacilities] = useState();
    const [isReloading, setIsReloading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        const fetData = async () => {
            const list = await findAllFacilities();
            setListFacilities(list);
        }
        fetData();
    }, [isReloading]);
    const handleClose = () => { setIsShowModal(false) }
    const handleShow=(item)=>{setIsShowModal(true);setSelectedItem(item)}
    const confirmDelete = async (id) => {
        try {
            await deleteByIdFacilities(id);
            setIsReloading(pre => !pre);
            setIsShowModal(false);
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };
    return (
        <>
            <div className="container mt-4">
                <div className="row g-4">
                    {listFacilities?.map((facility) => (
                        <div className="col-12 col-md-6 col-lg-4" key={facility.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img variant="top" src={img} />
                                <Card.Body>
                                    <Card.Title>{facility.name}</Card.Title>
                                    <Card.Text>
                                        Diện tích: {facility.area} m2 <br />
                                        Chi phí: {facility.cost?.toLocaleString('vi-VN')} VNĐ
                                    </Card.Text>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/detail-facilities/${facility.id}`} className="btn btn-success">Chi tiết</Link>
                                        <Link to={`/edit-facilities/${facility.id}`} className="btn btn-warning ">Sửa</Link>
                                        <button className={"btn btn-danger"} onClick={() => handleShow(facility)}>Xóa</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <DeleteModal
                show={isShowModal}
                handleClose={handleClose}
                handleDelete={confirmDelete}
                itemInfo={selectedItem}
            />
        </>
    )

}
export default ListFacilities;