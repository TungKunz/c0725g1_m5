import { useState, useEffect } from "react";
import { findAllFacilitiesTypes } from "../service/FacilitiesTypesService.js";
import AddVilla from "./AddVilla.jsx";
import AddHouse from "./AddHouse.jsx";
import AddRoom from "./AddRoom.jsx";

const AddFacilities = () => {
    const [facilityTypeId, setFacilityTypeId] = useState(1);
    const [facilityTypes, setFacilityTypes] = useState([]);

    useEffect(() => {
        const fetchFacilityTypes = async () => {
            const fTypes = await findAllFacilitiesTypes();
            setFacilityTypes(fTypes);
        };
        fetchFacilityTypes();
    }, []);

    const renderForm = () => {
        switch (facilityTypeId) {
            case 1: return <AddVilla />;
            case 2: return <AddHouse />;
            case 3: return <AddRoom />;
            default: return <AddVilla />;
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary text-center">Thêm mới Dịch vụ</h2>

            <ul className="nav nav-tabs mb-4 justify-content-center">
                {facilityTypes.map(type => (
                    <li className="nav-item" key={type.id}>
                        <button
                            className={`nav-link fw-bold ${facilityTypeId === type.id ? 'active' : ''}`}
                            onClick={() => setFacilityTypeId(type.id)}
                            style={{ cursor: 'pointer', borderBottom: facilityTypeId === type.id ? '3px solid #0d6efd' : 'none' }}
                        >
                            {type.name}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default AddFacilities;