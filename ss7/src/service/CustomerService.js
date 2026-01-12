import axios from "axios";

const URL_PLAYER = "http://localhost:2404";
export async function findAllCustomer() {
    try {
        const res = await axios.get(`${URL_PLAYER}/customers`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
    return [];
}
export async function findByIdCustomer(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/customers/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}
export async function deleteByIdCustomer(id) {
    try {
        const res = await axios.delete(`${URL_PLAYER}/customers/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function addCustomer(facility) {
    try {
        const res = await axios.post(`${URL_PLAYER}/customers`, facility);
        return res.status === 201;

    } catch (e) {
        console.log(e);
    }
    return false;
}
export async function editCustomer(customer) {
    try {
        const res = await axios.put(`${URL_PLAYER}/customers/${customer.id}`, customer);
        return res.status === 200;

    } catch (e) {
        console.log(e);
    }
    return false;
}