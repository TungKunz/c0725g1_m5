import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteById } from "../service/Player.js";
import { toast } from "react-toastify";

const DeleteComponent = ({ show, deletePlayer, handleClose, setIsReloading }) => {
    const handleDelete = async () => {
        try {
            await deleteById(deletePlayer.id);
            toast.success("Xóa thành công!");
            handleClose();
            setIsReloading(pre=>!pre);
        } catch (e) {
            toast.error("Xóa thất bại!");
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa cầu thủ <span>{deletePlayer.name}</span> này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xác nhận xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteComponent;