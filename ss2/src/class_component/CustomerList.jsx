import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {getAll, deleteCustomer, addCustomer} from "../service/CustomerService.js";
import NavbarComponent from "./NavbarComponent.jsx";
import DeleteComponent from "./DeleteComponent.jsx";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isShowModal: false,
            customerSelector:{},
            newCustomer: { ten: "", diaChi: "", loai: "Thường" }
        };
    }
    handleClose = () => this.setState({ isShowModal: false });
    handleShow = (customer) => this.setState({ isShowModal: true,
        customerSelector:customer});
    componentDidMount() {
        const data = getAll();
        this.setState({ customers: data });
    }
    onDeleteSuccess = () => {
        const data = getAll();
        this.setState({
            customers: data,
            isShowModal: false
        });
    }
    handleChange = (e) => {
        this.setState({
            newCustomer: {
                ...this.state.newCustomer,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSave = () => {
        const currentData =this.state.customers;
        const lastItem = currentData[currentData.length - 1];
        const nextId = lastItem ? lastItem.id + 1 : 1;
        const nextMa = "C00" + nextId;

        const dataToSave = {
            ...this.state.newCustomer,
            id: nextId,
            ma: nextMa
        };
        this.setState({
            customers: [...currentData,dataToSave],
            isShowModal: false,
            newCustomer: { ten: "", diaChi: "", loai: "Thường" },
        })
        // addCustomer(dataToSave);

        console.log(dataToSave);
        alert("Thêm thành công!");
        // window.location.href = "/";
    };
    render() {
        return (
            <>
                <NavbarComponent />
                <div className="container mt-4">
                    <h2>Danh sách khách hàng</h2>
                    <div className="container">
                        <h2>Thêm khách hàng mới</h2>
                        <input value={this.state.newCustomer.ten} name="ten" placeholder="Tên" onChange={this.handleChange} className="form-control mb-2" />
                        <input value={this.state.newCustomer.diaChi} name="diaChi" placeholder="Địa chỉ" onChange={this.handleChange} className="form-control mb-2" />
                        <button onClick={this.handleSave} className="btn btn-success">Lưu</button>
                    </div>
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
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <DeleteComponent
                    show={this.state.isShowModal}
                    handleClose={this.handleClose}
                    customer={this.state.customerSelector}
                    onDeleteSuccess={this.onDeleteSuccess}/>
            </>
        );
    }
}

export default CustomerList;