import axios from "axios";

const URL_PLAYER = "http://localhost:2404";
export async function getAll() {
    try {
        const res = await axios.get(`${URL_PLAYER}/players`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
    return [];
}
export async function deleteById(id) {
    try {
        const res = await axios.delete(`${URL_PLAYER}/players/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function findById(id) {
    try {
        const res = await axios.get(`${URL_PLAYER}/players/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}
export async function add(player) {
    try {
        const res = await axios.post(`${URL_PLAYER}/players`, player);
        return res.status === 201;

    } catch (e) {
        console.log(e);
    }
    return false;
}
export async function update(player) {
    try {
        const res = await axios.put(`${URL_PLAYER}/players/${player.id}`, player);
        return res.status === 200;

    } catch (e) {
        console.log(e);
    }
    return false;
}

