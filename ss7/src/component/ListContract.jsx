import {useEffect, useState} from "react";
import {deleteByIdCustomer, findAllCustomer} from "../service/CustomerService.js";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModal.jsx";
import {deleteByIdContract, findAllContracts} from "../service/ContractService.js";

const ListContract = () => {
    const [listContracts, setListContracts] = useState([]);
    const [isReloading, setIsReloading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const list = await findAllContracts();
            setListContracts(list);
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
            await deleteByIdContract(id);
            setIsReloading((pre) => !pre);
            setIsShowModal(false);
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Quản lý Hợp đồng</h2>
            {/*<li className="nav-item">*/}
            {/*    <Link className={"btn btn-sm btn-primary"} to={"/add-customer"}>Customer</Link>*/}
            {/*</li>*/}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã hợp đồng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {/*"id": 1,*/}
                {/*"contractNumber": "CON-0001",*/}
                {/*"startDate": "2024-05-01",*/}
                {/*"endDate": "2024-05-05",*/}
                {/*"deposit": 1000000,*/}
                {/*"totalPayment": 40000000,*/}
                {/*"customerId": 1,*/}
                {/*"facilityId": 1,*/}
                {/*"employeeId": 1*/}
                {listContracts?.map((c, i) => (
                    <tr key={c.id}>
                        <td>{i + 1}</td>
                        <td>{c.contractNumber}</td>
                        <td>{new Date(c.startDate).toLocaleDateString("vi-VN")}</td>
                        <td>{new Date(c.endDate).toLocaleDateString("vi-VN")}</td>

                        <td className="d-flex gap-2">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleShow(c)}
                            >
                                Delete
                            </button>

                            <Link className="btn btn-sm btn-primary" to={`/detail-contract/${c.id}`}>
                                Detail
                            </Link>

                            <Link className="btn btn-sm btn-warning" to={`/edit-contract/${c.id}`}>
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
}
export default ListContract;