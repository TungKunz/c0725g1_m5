import axios from "axios";
const URL_PLAYER = "http://localhost:2404";
export async function findByIdRentTypes(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/rentTypes/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function findAllRentTypes() {
    try {
        const res = await axios.get(`${URL_PLAYER}/rentTypes`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}