import React, { useState, useEffect } from 'react';

const RequestForm = ({ customers, services, onSubmit }) => {
    const [formData, setFormData] = useState({
        customer_id: '',
        service_id: '',
        city: '',
        area_type: '',
        deadline: '',
        notes: '',
        status: '',
        request_date: new Date().toISOString()  // Set default to today's date
    });
    const [serviceInfo, setServiceInfo] = useState(null);

    const [customerNameSearch, setCustomerNameSearch] = useState('');
    const [initialsSearch, setInitialsSearch] = useState('');

    // Update service info when a service is selected
    useEffect(() => {
        const selectedServiceDetails = services.find(service => service.service_id === formData.service_id);
        setServiceInfo(selectedServiceDetails);
    }, [formData.service_id, services]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCustomerSelect = (selectedCustomer) => {
        setFormData(prevState => ({
            ...prevState,
            customer_id: selectedCustomer.customer_id,
        }));
        setCustomerNameSearch(selectedCustomer.name);
        setInitialsSearch(selectedCustomer.initials);
    };

    const handleNameSearchChange = (e) => {
        const value = e.target.value;
        setCustomerNameSearch(value);
        // If the search field is cleared, reset the form data related to customer selection
        if (value === '') {
            setFormData(prevState => ({
                ...prevState,
                customer_id: '',
            }));
        }
    };

    const handleInitialsSearchChange = (e) => {
        const value = e.target.value;
        setInitialsSearch(value);
        // If the search field is cleared, reset the form data related to customer selection
        if (value === '') {
            setFormData(prevState => ({
                ...prevState,
                customer_id: '',
            }));
        }
    };

    // Filter customers based on the name search input
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerNameSearch.toLowerCase())
    );

    // Filter customers based on the initials search input
    const filteredInitials = customers.filter(customer =>
        customer.initials.toLowerCase().includes(initialsSearch.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert initialized_date to TIMESTAMPTZ format
        const formattedData = {
            ...formData,
            request_date: new Date(formData.request_date).toISOString(),
            deadline: new Date(formData.deadline).toISOString()
        };

        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>
                            Khách hàng
                            <br />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khách hàng"
                                value={customerNameSearch}
                                onChange={handleNameSearchChange}
                            />
                        </th>
                        <th>
                            Chọn theo ký hiệu
                            <br />
                            <input
                                type="text"
                                placeholder="Tìm kiếm ký hiệu"
                                value={initialsSearch}
                                onChange={handleInitialsSearchChange}
                            />
                        </th>
                        <th>Dịch vụ</th>
                        <th>Thành phố</th>
                        <th>Khu vực</th>
                        <th>Ghi chú</th>
                        <th>Tiến độ</th>
                        <th>Ngày khởi tạo</th>
                        <th>Deadline</th>
                        <th>Thông tin dịch vụ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select 
                                name="customer_id"
                                value={formData.customer_id}
                                onChange={(e) => {
                                    const selectedCustomer = customers.find(customer => customer.customer_id === parseInt(e.target.value));
                                    if (selectedCustomer) {
                                        handleCustomerSelect(selectedCustomer);
                                    }
                                }}
                                required
                            >
                                <option value="">--Chọn khách hàng--</option>
                                {filteredCustomers.map(customer => (
                                    <option key={customer.customer_id} value={customer.customer_id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select 
                                name="initials"
                                value={customers.find(c => c.customer_id === formData.customer_id)?.initials || initialsSearch}
                                onChange={(e) => {
                                    const selectedCustomer = customers.find(customer => customer.initials === e.target.value);
                                    if (selectedCustomer) {
                                        handleCustomerSelect(selectedCustomer);
                                    }
                                }}
                                required
                            >
                                <option value="">--Chọn ký hiệu--</option>
                                {filteredInitials.map(customer => (
                                    <option key={customer.customer_id} value={customer.initials}>
                                        {customer.initials}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select 
                                name="service_id"
                                value={formData.service_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--Chọn dịch vụ--</option>
                                {services.map(service => (
                                    <option key={service.service_id} value={service.service_id}>
                                        {service.service_name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Nhập thành phố"
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="area_type"
                                value={formData.area_type}
                                onChange={handleChange}
                                placeholder="Nhập khu vực"
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Thêm ghi chú"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                placeholder="Nhập tiến độ"
                            />
                        </td>
                        <td>
                            <input
                                type="date"
                                name="request_date"
                                value={formData.request_date.split('T')[0]}
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline.split('T')[0]}
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            {serviceInfo ? (
                                <div>
                                    <p><strong>Chi tiết:</strong> {serviceInfo.service_description}</p>
                                    <p><strong>Giá:</strong> ${serviceInfo.service_price}</p>
                                    <p><strong>Thời gian hoàn thành:</strong> {serviceInfo.completion_time}</p>
                                    <p><strong>Ghi chú:</strong> {serviceInfo.service_notes || 'N/A'}</p>
                                </div>
                            ) : (
                                <p>Chọn dịch vụ để xem thêm thông tin chi tiết</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Lưu</button>
        </form>
    );
};

export default RequestForm;
