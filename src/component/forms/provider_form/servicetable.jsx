import React, { useState, useEffect } from 'react';

const ProviderServiceTable = ({ providerService, onServiceChange }) => {
    const [providerServices, setProviderServices] = useState(providerService);

    const handleInputChange = (e, providerServiceId) => {
        const { name, value } = e.target;

        // Update the providerServices state with the new value
        const updatedServices = providerServices.map(service =>
            service.provider_service_id === providerServiceId
                ? { ...service, [name]: value }
                : service
        );

        setProviderServices(updatedServices);

        // Pass the updated services to the parent component only if needed
        onServiceChange(updatedServices);
    };

    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Mã dịch vụ của nhà cung cấp</th>
                        <th>Tên dịch vụ</th>
                        <th>Giá nhà cung cấp</th>
                        <th>Giá bán lại</th>
                        <th>Khả dụng</th>
                        <th>Ghi chú nhà cung cấp</th>
                    </tr>
                </thead>
                <tbody>
                    {providerServices.map(service => (
                        <tr key={service.provider_service_id}>
                            <td>{service.provider_service_id}</td>
                            <td>{service.service_name}</td>
                            <td>
                                <input
                                    type="number"
                                    name="provider_price"
                                    value={service.provider_price || ''}
                                    onChange={(e) => handleInputChange(e, service.provider_service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="service_price"
                                    value={service.service_price || ''}
                                    onChange={(e) => handleInputChange(e, service.provider_service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="availability"
                                    value={service.availability || ''}
                                    onChange={(e) => handleInputChange(e, service.provider_service_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="provider_notes"
                                    value={service.provider_notes || ''}
                                    onChange={(e) => handleInputChange(e, service.provider_service_id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProviderServiceTable;
