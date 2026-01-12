import axios from "axios";

const URL_PLAYER = "http://localhost:2404";
export async function findAllEmployees() {
    try {
        const res = await axios.get(`${URL_PLAYER}/employees`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
    return [];
}
export async function findByIdEmployee(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/employees/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}
export async function deleteByIdEmployee(id) {
    try {
        const res = await axios.delete(`${URL_PLAYER}/employees/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function addEmployee(employee) {
    try {
        const res = await axios.post(`${URL_PLAYER}/employees`, employee);
        return res.status === 201;

    } catch (e) {
        console.log(e);
    }
    return false;
}
export async function editEmployee(employee) {
    try {
        const res = await axios.put(`${URL_PLAYER}/employees/${employee.id}`, employee);
        return res.status === 200;

    } catch (e) {
        console.log(e);
    }
    return false;
}