import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { addCustomerAPI, addCompanyAPI } from '../../util/api';

const AddCustomer = () => {   
    const [newCustomerId, setNewCustomerId] = useState(null);
    const [userInfo, setUserInfo] = useState({
        customer_name: null,
        username: null,
        phone_number: null,
        customer_email: null,
        nationality: null,
        initials: null,
        status: "Active", // Assuming status is always "Active" at creation
        company_name: null,
        company_email: null,
        tax_number: null,
        address: null,
        business_domain: null,
    });

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCustomer();
    };

    const createCustomer = async () => {
        const customerData = {
            name: userInfo.customer_name,
            username: userInfo.username,
            phone_number: userInfo.phone_number,
            email: userInfo.customer_email,
            nationality: userInfo.nationality,
            initials: userInfo.initials,
            status: userInfo.status,
        };
        
        const res = await addCustomerAPI(customerData);
        if (res?.EC === 0) {
            notification.success({
                message: "Tạo khách hàng thành công",
                description: "Khách hàng đã được thêm thành công",
            });
            setNewCustomerId(res.newCustomer.customer_id);
        } else {
            notification.error({
                message: "Lỗi khởi tạo khách hàng",
                description: res.message || "Không thể tạo khách hàng",
            });
        }
    };

    useEffect(() => {
        if (newCustomerId) {
            createCompany();
        }
    }, [newCustomerId]);

    const createCompany = async () => {
        const companyData = {
            company_name: userInfo.company_name,
            customer_id: newCustomerId,
            manufacturing_industry: userInfo.business_domain,
            tax_number: userInfo.tax_number,
            company_email: userInfo.company_email,
            address: userInfo.address,
            debt: 0, // Assuming a default value for debt as per your example
        };
        const res = await addCompanyAPI(companyData);
        if (res?.EC === 0) {
            notification.success({
                message: "Tạo công ty thành công",
                description: "Công ty đã được thêm thành công",
            });
        } else {
            notification.error({
                message: "Lỗi khởi tạo công ty",
                description: res.message || "Không thể tạo công ty",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Thông tin khách hàng</h3>
                <div>
                    <label>*Họ và Tên:</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={userInfo.customer_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        name="username"
                        value={userInfo.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Số Điện Thoại:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={userInfo.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="customer_email"
                        value={userInfo.customer_email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Quốc tịch:</label>
                    <input
                        type="text"
                        name="nationality"
                        value={userInfo.nationality}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>*Viết tắt:</label>
                    <input
                        type="text"
                        name="initials"
                        value={userInfo.initials}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h3>Thông tin công ty</h3>
                <div>
                    <label>*Tên công ty:</label>
                    <input
                        type="text"
                        name="company_name"
                        value={userInfo.company_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ngành nghề kinh doanh sản xuất:</label>
                    <input
                        type="text"
                        name="business_domain"
                        value={userInfo.business_domain}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mã số thuế:</label>
                    <input
                        type="text"
                        name="tax_number"
                        value={userInfo.tax_number}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>*Email:</label>
                    <input
                        type="email"
                        name="company_email"
                        value={userInfo.company_email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Lưu</button>
            </form>
        </>
    );
};

export default AddCustomer;
