import axios from "axios";
const URL_PLAYER = "http://localhost:2404";
export async function findByIdFacilitiesTypes(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/facilityTypes/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function findAllFacilitiesTypes() {
    try {
        const res = await axios.get(`${URL_PLAYER}/facilityTypes`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}