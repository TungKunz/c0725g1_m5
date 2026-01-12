import axios from "axios";

const URL_PLAYER = "http://localhost:2404";
export async function findAllFacilities() {
    try {
        const res = await axios.get(`${URL_PLAYER}/facilities`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
    return [];
}
export async function findByIdFacilities(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/facilities/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}
export async function deleteByIdFacilities(id) {
    try {
        const res = await axios.delete(`${URL_PLAYER}/facilities/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function addFacilities(facility) {
    try {
        const res = await axios.post(`${URL_PLAYER}/facilities`, facility);
        return res.status === 201;

    } catch (e) {
        console.log(e);
    }
    return false;
}