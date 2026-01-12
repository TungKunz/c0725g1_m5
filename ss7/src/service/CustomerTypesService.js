import axios from "axios";
const URL_PLAYER = "http://localhost:2404";
export async function findByIdCustomerTypes(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/customerTypes/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function findAllCustomerTypes() {
    try {
        const res = await axios.get(`${URL_PLAYER}/customerTypes`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}