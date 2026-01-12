import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findAllFacilitiesTypes } from "../service/FacilitiesTypesService";
import { findFacilityById } from "../service/FacilitiesService";

import EditVilla from "./EditVilla";
import EditHouse from "./EditHouse";
import EditRoom from "./EditRoom";

const EditFacilities = () => {
    const { id } = useParams();

    const [facilityTypeId, setFacilityTypeId] = useState(null);
    const [facilityTypes, setFacilityTypes] = useState([]);
    const [facility, setFacility] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fTypes = await findAllFacilitiesTypes();
            setFacilityTypes(fTypes);

            const f = await findFacilityById(id);
            setFacility(f);
            setFacilityTypeId(f.facilityTypeId);
        };
        fetchData();
    }, [id]);

    const renderForm = () => {
        if (!facilityTypeId || !facility) return null;

        switch (facilityTypeId) {
            case 1:
                return <EditVilla facility={facility} />;
            case 2:
                return <EditHouse facility={facility} />;
            case 3:
                return <EditRoom facility={facility} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary text-center">Chỉnh sửa Dịch vụ</h2>

            <ul className="nav nav-tabs mb-4 justify-content-center">
                {facilityTypes.map(type => (
                    <li className="nav-item" key={type.id}>
                        <button
                            className={`nav-link fw-bold ${facilityTypeId === type.id ? 'active' : ''}`}
                            disabled
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

export default EditFacilities;
