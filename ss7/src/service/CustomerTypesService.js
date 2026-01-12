import axios from "axios";

const URL_CUSTOMER = "http://localhost:8080/api/customer-type";

export const findAllCustomerType = async () => {
    const res = await axios.get(URL_CUSTOMER);
    return res.data;
};

export const findByIdCustomer = async (id) => {
    const res = await axios.get(`${URL_CUSTOMER}/${id}`);
    return res.data;
};

export const addCustomer = async (customer) => {
    const res = await axios.post(URL_CUSTOMER, customer);
    return res.data;
};

export const editCustomer = async (id, customer) => {
    const res = await axios.put(`${URL_CUSTOMER}/${id}`, customer);
    return res.data;
};

export const deleteByIdCustomer = async (id) => {
    await axios.delete(`${URL_CUSTOMER}/${id}`);
};
