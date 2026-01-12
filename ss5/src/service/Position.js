import axios from "axios";

const URL_PLAYER = "http://localhost:2404";
export async function getAllPosition() {
    try {
        const res = await axios.get(`${URL_PLAYER}/position`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}