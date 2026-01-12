import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
const DeleteModal = ({ show, handleClose, handleDelete, itemInfo }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa <strong>{itemInfo?.name}</strong> không?
                <br />
                <small className="text-danger">Hành động này không thể hoàn tác.</small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={() => handleDelete(itemInfo?.id)}>
                    Xác nhận xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;