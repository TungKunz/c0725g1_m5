import React, { Component, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DeleteComponent from "./DeleteComponent.jsx";
import AddComponent from "./AddComponent.jsx";
import { getAll } from "../service/Player.js";
import {Link} from "react-router-dom";
import {Outlet, useNavigate} from "react-router-dom";
const PlayerManagerComponent = () => {
    const [players, setPlayers] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deletePlayer, setDeletePlayer] = useState({
        id: "",
        name: ""
    });
    const [keyword, setKeyword] = useState("");

    const handleClose = () => { setIsShowModal(false) }
    const handleShow = (player) => { setDeletePlayer(player); setIsShowModal(true) };

    const handleAddSuccess = () => {
        setPlayers([...getAll()]);
    };

    // 1. Chỉ fetch dữ liệu 1 lần khi component mount
    useEffect(() => {
        setPlayers([...getAll()]);
    }, []);

    // 2. Tự động cập nhật danh sách hiển thị (playerList) khi players hoặc keyword thay đổi
    useEffect(() => {
        if (!keyword.trim()) {
            setPlayerList(players);
        } else {
            const lower = keyword.toLowerCase();
            const filtered = players.filter(p => p.name.toLowerCase().includes(lower));
            setPlayerList(filtered);
        }
    }, [keyword, players]);
    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4 text-center">Quản lý cầu thủ</h2>
                <Outlet/>
                <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                        placeholder="Tìm theo tên..."
                        style={{ width: 400, padding: 8 }}
                        className="form-control"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="btn btn-secondary" onClick={() => setKeyword("")}> Xoá lọc</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã cầu thủ</th>
                            <th>Tên cầu thủ</th>
                            <th>Ngày sinh</th>
                            <th>Giá trị cầu thủ</th>
                            <th>Vị trí</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerList && playerList.map((p, i) => (
                            <tr key={p.id}>
                                <td>{i + 1}</td>
                                <td>{p.playerCode}</td>
                                <td>{p.name}</td>
                                <td> {new Date(p.dob).toLocaleDateString("vi-VN")}</td>
                                <td>{p.transferValue}</td>
                                <td>{p.position}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleShow(p)}>
                                        Delete
                                    </button>
                                    <Link to={`/detail/${p.id}`}>Detail</Link>
                                    <Link to={`/${p.id}`}>Detail</Link>
                                    <Link to={`/edit/${p.id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DeleteComponent
                show={isShowModal}
                handleClose={handleClose}
                deletePlayer={deletePlayer}
                onDeleteSuccess={handleAddSuccess}
            />
        </>
    );
}

export default PlayerManagerComponent;