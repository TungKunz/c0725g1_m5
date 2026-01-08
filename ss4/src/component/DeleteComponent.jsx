import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteById } from "../service/Player.js";

const DeleteComponent = ({ show, deletePlayer, handleClose, onDeleteSuccess }) => {

    const handleDelete = () => {
        deleteById(deletePlayer.id);
        onDeleteSuccess();
        handleClose();
    }
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