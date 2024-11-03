import React, { useState, useEffect } from 'react';
import {  addRecurringRequestAPI } from '../../../util/api';
import { notification } from 'antd';

const RecurringTable = ({ customers, requests }) => {
    const [formData, setFormData] = useState({
        customer_id: '',
        service_id: '',
        recurrence_interval: '',
        next_due_date: new Date().toISOString().slice(0, 10), // Initialize to current date
        end_date: new Date().toISOString().slice(0, 10),       // Initialize to current date
    });
    const [filteredServices, setFilteredServices] = useState([]); // Holds services linked to selected customer
    const [customerNameSearch, setCustomerNameSearch] = useState('');
    const [initialsSearch, setInitialsSearch] = useState('');

    // Update formData on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle customer selection
    const handleCustomerSelect = (selectedCustomer) => {
        setFormData(prevState => ({
            ...prevState,
            customer_id: selectedCustomer.customer_id,
            initials: selectedCustomer.initials
        }));
        setCustomerNameSearch(selectedCustomer.name);
        setInitialsSearch(selectedCustomer.initials);
    };

    // Filter services when a customer is selected
    useEffect(() => {
        if (formData.customer_id) {
            const customerServices = requests.filter(
                request => request.customer_id === parseInt(formData.customer_id) // Ensure customer_id is an integer
            ).map(request => ({
                service_id: request.service_id,  // No need to parse, keep it as a string
                service_name: request.service_name
            }));

            setFilteredServices(customerServices);
        } else {
            setFilteredServices([]);
        }
    }, [formData.customer_id, requests]);

    // Filter customers based on name search
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerNameSearch.toLowerCase())
    );

    // Filter customers based on initials search
    const filteredInitials = customers.filter(customer =>
        customer.initials.toLowerCase().includes(initialsSearch.toLowerCase())
    );

    const handleNameSearchChange = (e) => {
        const value = e.target.value;
        setCustomerNameSearch(value);
        // If user clears the search, also clear the formData fields
        if (value === '') {
            setFormData(prevState => ({
                ...prevState,
                customer_id: '',
            }));
        }
        const selectedCustomer = customers.find(customer => customer.name.toLowerCase() === value.toLowerCase());
        if (selectedCustomer) {
            handleCustomerSelect(selectedCustomer);
        }
    };

    const handleInitialsSearchChange = (e) => {
        const value = e.target.value;
        setInitialsSearch(value);
        // If user clears the search, also clear the formData fields
        if (value === '') {
            setFormData(prevState => ({
                ...prevState,
                customer_id: '',
            }));
        }
        const selectedCustomer = customers.find(customer => customer.initials.toLowerCase() === value.toLowerCase());
        if (selectedCustomer) {
            handleCustomerSelect(selectedCustomer);
        }
    };

    // Handle form submission
    const handleFormSubmit = async (data) => {
        try {
            const res = await addRecurringRequestAPI(data);
            if (res) {
                notification.success({
                    message: "Tạo đơn mua hàng thành công",
                    description: "Success"
                });
            } else {
                notification.error({
                    message: "Lỗi tạo đơn mua hàng",
                    description: "Error"
                });
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            notification.error({
                message: "Error",
                description: "An error occurred while submitting the data"
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(formData);
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
                        <th>Chu kỳ lặp lại</th>
                        <th>Ngày thanh toán tiếp theo</th>
                        <th>Ngày kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* Select customer based on name search */}
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
                        {/* Select by initials based on initials search */}
                        <td>
                            <select 
                                name="initials"
                                value={customers.find(c => c.customer_id === formData.customer_id)?.initials || ''}
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

                        {/* Select service (filtered by customer) */}
                        <td>
                            <select 
                                name="service_id"
                                value={formData.service_id}
                                onChange={handleChange}
                                required
                                disabled={!filteredServices.length} // Disable if no customer selected or no services available
                            >
                                <option value="">--Chọn dịch vụ--</option>
                                {filteredServices.map(service => (
                                    <option key={service.service_id} value={service.service_id}>
                                        {service.service_name}
                                    </option>
                                ))}
                            </select>
                        </td>

                        {/* Recurrence interval */}
                        <td>
                            <select
                                name="recurrence_interval"
                                value={formData.recurrence_interval}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--Chọn chu kỳ lặp lại--</option>
                                <option value="Daily">Hàng ngày</option>
                                <option value="Weekly">Hàng tuần</option>
                                <option value="Monthly">Hàng tháng</option>
                                <option value="Quarterly">Hàng quý</option>
                                <option value="Yearly">Hàng năm</option>
                            </select>
                        </td>

                        {/* Next due date */}
                        <td>
                            <input
                                type="date"
                                name="next_due_date"
                                value={formData.next_due_date}
                                onChange={handleChange}
                                required
                            />
                        </td>

                        {/* End date */}
                        <td>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Lưu</button>
        </form>
    );
};

export default RecurringTable;
