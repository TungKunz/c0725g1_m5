// import React, { Component } from "react";
// import { addCustomer, getAll } from "../service/CustomerService";
//
// class AddComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             newCustomer: { ten: "", diaChi: "", loai: "Thường" }
//         };
//     }
//
//     handleChange = (e) => {
//         this.setState({
//             newCustomer: {
//                 ...this.state.newCustomer,
//                 [e.target.name]: e.target.value
//             }
//         });
//     };
//
//     handleSave = () => {
//         const currentData = getAll();
//         const lastItem = currentData[currentData.length - 1];
//         const nextId = lastItem ? lastItem.id + 1 : 1;
//         const nextMa = "C00" + nextId;
//
//         const dataToSave = {
//             ...this.state.newCustomer,
//             id: nextId,
//             ma: nextMa
//         };
//
//         addCustomer(dataToSave);
//         console.log(dataToSave);
//         alert("Thêm thành công!");
//         // window.location.href = "/";
//     };
//
//     render() {
//         return (
//             <div className="container">
//                 <h2>Thêm khách hàng mới</h2>
//                 <input name="ten" placeholder="Tên" onChange={this.handleChange} className="form-control mb-2" />
//                 <input name="diaChi" placeholder="Địa chỉ" onChange={this.handleChange} className="form-control mb-2" />
//                 <button onClick={this.handleSave} className="btn btn-success">Lưu</button>
//             </div>
//         );
//     }
// }
// export default AddComponent;