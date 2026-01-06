const customers = [
    { id: 1, ma: "C001", ten: "Nguyễn Văn A", diaChi: "Hà Nội", loai: "VIP" },
    { id: 2, ma: "C002", ten: "Trần Thị B", diaChi: "Đà Nẵng", loai: "Thường" },
    { id: 3, ma: "C003", ten: "Lê Văn C", diaChi: "TP.HCM", loai: "Doanh nghiệp" }
];
export const getAll = () => customers;

export function deleteCustomer(id) {
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        console.log("Đã xóa thành công ID:", id);
    }
}
export const addCustomer = (customer) => {
    customers.push(customer);
};