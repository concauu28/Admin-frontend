import React, { useState } from 'react';
import { notification } from 'antd';
import { addProviderAPI } from '../../util/api'; // Import your API function for adding providers

const CreateProvider = () => {   
    const [providerInfo, setProviderInfo] = useState({
        username: null,
        email: "",
        password: "1",
        phone_number: null,
        company_name: "",
        provider_initials:null,
        tax_number:null,
        debt: 0.00,
        isInternal: false,
        address:null,
        status: "Active", // Assuming status is always "Active" at creation
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProviderInfo({
            ...providerInfo,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProvider();
    };

    const createProvider = async () => {
        const res = await addProviderAPI(providerInfo);
        if (res?.EC === 0) {
            notification.success({
                message: "Tạo nhà cung cấp thành công",
                description: "Nhà cung cấp đã được thêm thành công.",
            });
        } else {
            notification.error({
                message: "Lỗi khởi tạo nhà cung cấp",
                description: res.message || "Không thể tạo nhà cung cấp.",
            });
        }
        console.log(providerInfo);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Thông tin nhà cung cấp</h3>
                <div>
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="company_name"
                        value={providerInfo.company_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        name="username"
                        value={providerInfo.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={providerInfo.email}
                        onChange={handleChange}
                    />
                </div>
                {/* <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={providerInfo.password}
                        onChange={handleChange}
                    />
                </div> */}
                <div>
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={providerInfo.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Viết tắt:</label>
                    <input
                        type="text"
                        name="provider_initials"
                        value={providerInfo.provider_initials}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mã số thuế:</label>
                    <input
                        type="text"
                        name="tax_number"
                        value={providerInfo.tax_number}
                        onChange={handleChange}
                    />
                </div>
                {/* <div>
                    <label>Nợ:</label>
                    <input
                        type="number"
                        name="debt"
                        value={providerInfo.debt}
                        onChange={handleChange}
                    />
                </div> */}
                <div>
                    <label>Là nội bộ:</label>
                    <input
                        type="checkbox"
                        name="isInternal"
                        checked={providerInfo.isInternal}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={providerInfo.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Trạng thái:</label>
                    <input
                        type="text"
                        name="status"
                        value={providerInfo.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Lưu</button>
            </form>
        </>
    );
};

export default CreateProvider;
