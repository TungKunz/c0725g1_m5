import axios from "axios";

const URL_PLAYER = "http://localhost:2404";
export async function findAllContracts() {
    try {
        const res = await axios.get(`${URL_PLAYER}/contracts`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
    return [];
}
export async function findByIdContract(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/contracts/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}
export async function deleteByIdContract(id) {
    try {
        const res = await axios.delete(`${URL_PLAYER}/contracts/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function addContract(contract) {
    try {
        const res = await axios.post(`${URL_PLAYER}/contracts`, contract);
        return res.status === 201;

    } catch (e) {
        console.log(e);
    }
    return false;
}
export async function editContract(contract) {
    try {
        const res = await axios.put(`${URL_PLAYER}/contracts/${contract.id}`, contract);
        return res.status === 200;

    } catch (e) {
        console.log(e);
    }
    return false;
}