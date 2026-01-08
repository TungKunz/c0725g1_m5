import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Player } from "../model/Player";
import { save } from "../service/Player";

const AddComponent = ({ onSaveSuccess }) => {
    const [newPlayer, setNewPlayer] = useState(new Player());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        save(newPlayer);
        onSaveSuccess();
        setNewPlayer(new Player());
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="bg-primary text-white">Thêm mới cầu thủ</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Mã cầu thủ</label>
                            <Form.Control
                                type="text"
                                name="playerCode"
                                placeholder="PL-XXXX"
                                value={newPlayer.playerCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Tên cầu thủ</label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newPlayer.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Ngày sinh</label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={newPlayer.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Giá trị chuyển nhượng</label>
                            <Form.Control
                                type="number"
                                name="transferValue"
                                value={newPlayer.transferValue}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Vị trí</label>
                            <Form.Control
                                type="text"
                                name="position"
                                value={newPlayer.position}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3 d-flex align-items-end">
                            <Button variant="success" type="submit" className="w-100">
                                <i className="bi bi-plus-circle"></i> Thêm mới
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddComponent;
