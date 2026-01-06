import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap"; // Dùng thư viện react-bootstrap
import "bootstrap/dist/css/bootstrap.css";
import { getAll,deleteCustomer } from "../service/CustomerService.js";
import NavbarComponent from "./NavbarComponent.jsx";
import {Link} from "react-router-dom";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isShowModal: false,
            customerSelector:{},
            newCustomer:{ma:"",ten:"",diaChi:"",loai:""}
        };
    }

    componentDidMount() {
        const data = getAll();
        this.setState({ customers: data });
    }

    handleClose = () => this.setState({ isShowModal: false });
    handleShow = (customer) => this.setState({ isShowModal: true,
        customerSelector:customer});
    handleDelete = ()=>{
        deleteCustomer(this.state.customerSelector.id);
        const newData=getAll();
        this.setState({
            customers: newData,
            isShowModal: false
        });
    }
    render() {
        return (
            <>
                <NavbarComponent />
                <div className="container mt-4">
                    <h2>Danh sách khách hàng</h2>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã khách hàng</th>
                            <th>Tên</th>
                            <th>Địa Chỉ</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.customers.map((c, i) => (
                            <tr key={c.id}>
                                <td>{i + 1}</td>
                                <td>{c.ma}</td>
                                <td>{c.ten}</td>
                                <td>{c.diaChi}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={()=>this.handleShow(c)}>
                                        Delete
                                    </button>
                                    <Link to={"/add"} className={"btn btn-success btn-sm"}>Thêm mới</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Modal show={this.state.isShowModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có chắc chắn muốn xóa khách hàng <span>{this.state.customerSelector.ten}</span> này không?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Xác nhận xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CustomerList;