import {useEffect, useState} from "react";
import {deleteByIdCustomer, findAllCustomer} from "../service/CustomerService.js";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModal.jsx";

const ListCustomer = () => {
    const [listCustomer, setListCustomer] = useState([]);
    const [isReloading, setIsReloading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const list = await findAllCustomer();
            setListCustomer(list);
        };
        fetchData();
    }, [isReloading]);

    const handleClose = () => setIsShowModal(false);

    const handleShow = (item) => {
        setSelectedItem(item);
        setIsShowModal(true);
    };

    const confirmDelete = async (id) => {
        try {
            await deleteByIdCustomer(id);
            setIsReloading((pre) => !pre);
            setIsShowModal(false);
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Quản lý khách hàng</h2>
            <li className="nav-item">
                <Link className={"btn btn-sm btn-primary"} to={"/add-customer"}>Customer</Link>
            </li>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Số ĐT</th>
                    <th>Địa chỉ</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {listCustomer?.map((c, i) => (
                    <tr key={c.id}>
                        <td>{i + 1}</td>
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.address}</td>

                        <td className="d-flex gap-2">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleShow(c)}
                            >
                                Delete
                            </button>

                            <Link className="btn btn-sm btn-primary" to={`/detail-customer/${c.id}`}>
                                Detail
                            </Link>

                            <Link className="btn btn-sm btn-warning" to={`/edit-customer/${c.id}`}>
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <DeleteModal
                show={isShowModal}
                handleClose={handleClose}
                handleDelete={confirmDelete}
                itemInfo={selectedItem}
            />
        </div>
    );
};

export default ListCustomer;