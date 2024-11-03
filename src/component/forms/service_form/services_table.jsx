import React, { useState, useEffect } from 'react';

const ServicesTable = ({ initialServices, onServiceChanges }) => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        setServices(initialServices);
    },[]);
    const handleInputChange = (e, service_id) => {
        const { name, value } = e.target;

        // Update the local requests state
        const updatedService = services.map(service =>
            service.service_id === service_id
                ? { ...service, [name]: value }
                : service
        );
        setServices(updatedService);  // Update the local state
        // Send the updated data to the parent component
        onServiceChanges(updatedService);
    };
    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Mã dịch vụ</th>
                        <th>Tên dịch vụ</th>
                        <th>Giá dịch vụ</th>
                        <th>Loại dịch vụ</th>
                        <th>Thời gian hoàn thành</th>
                        <th>Ghi chú dịch vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(services => (
                        <tr key={services.service_id}>
                            <td>{services.service_id}</td>
                            <td>
                                <input
                                    type="text"
                                    name="service_name"
                                    value={services.service_name}
                                    onChange={(e) => handleInputChange(e, services.service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="price"
                                    value={services.price}
                                    onChange={(e) => handleInputChange(e, services.service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="type_of_service"
                                    value={services.type_of_service}
                                    onChange={(e) => handleInputChange(e, services.service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="completion_time"
                                    value={services.completion_time}
                                    onChange={(e) => handleInputChange(e, services.service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="notes"
                                    value={services.notes}
                                    onChange={(e) => handleInputChange(e, services.service_id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServicesTable;
