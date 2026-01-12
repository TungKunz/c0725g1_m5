import React, { Component, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DeleteComponent from "./DeleteComponent.jsx";
// import AddComponent from "./AddComponent.jsx";
import { getAll } from "../service/Player.js";
import {data, Link} from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
const PlayerManagerComponent = () => {
    const [playerList, setPlayerList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [deletePlayer, setDeletePlayer] = useState({
        id: "",
        name: ""
    });

    const handleClose = () => { setIsShowModal(false) }
    const handleShow = (player) => { setDeletePlayer(player); setIsShowModal(true) };
    const navigate = useNavigate();

    useEffect(() => {
        const fetData = async ()=>{
            let list = await getAll();
            setPlayerList(list);

        }
        fetData();
    },[isReloading]);
    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4 text-center">Quản lý cầu thủ</h2>
                <Outlet />
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
                                <td>{p.position?.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleShow(p)}>
                                        Delete
                                    </button>
                                    <Link className={"btn btn-sm btn-primary"} to={`/detail/${p.id}`}>Detail</Link>
                                    <Link className={"btn btn-sm btn-primary"} to={`/${p.id}`}>Detail</Link>
                                    <Link className={"btn btn-sm btn-warning"} to={`/edit/${p.id}`}>Edit</Link>
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
                setIsReloading = {setIsReloading}
            />
        </>
    );
}

export default PlayerManagerComponent;