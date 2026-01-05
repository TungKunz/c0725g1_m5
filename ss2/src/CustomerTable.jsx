import React from "react";

function CustomerTable(){
    const customers = [
        { id: 1, ma: "C001", ten: "Nguyễn Văn A", diaChi: "Hà Nội", loai: "VIP" },
        { id: 2, ma: "C002", ten: "Trần Thị B", diaChi: "Đà Nẵng", loai: "Thường" },
        { id: 3, ma: "C003", ten: "Lê Văn C", diaChi: "TP.HCM", loai: "Doanh nghiệp" }
    ];
    return(<>
            <div>
                <h2>Danh sách khách hàng</h2>
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã khách hàng</th>
                        <th>Tên</th>
                        <th>Địa Chỉ</th>
                        <th>Loại khách hàng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        customers.map((c,i)=>(
                            <tr key={c.id}>
                                <td>{i+1}</td>
                                <td>{c.ma}</td>
                                <td>{c.ten}</td>
                                <td>{c.diaChi}</td>
                                <td>{c.loai}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>

    )
}
export default CustomerTable;