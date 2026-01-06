import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {deleteCustomer, getAll} from "../service/CustomerService.js";

class DeleteComponent extends Component{

    handleDelete = () => {
        deleteCustomer(this.props.customer.id);
        this.props.onDeleteSuccess();
    }

    render() {
        return(
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có chắc chắn muốn xóa khách hàng <span>{this.props.customer.ten}</span> này không?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Xác nhận xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default DeleteComponent;