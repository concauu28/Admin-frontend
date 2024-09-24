import React, { useState } from 'react';

const AddProviderService = ({ listprovider, services, onSubmit }) => {
    const [formData, setFormData] = useState({
        provider_id: '',
        service_id: '',
        price: '',
        availability: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nhà cung cấp</label>
                <select 
                    name="provider_id"
                    value={formData.provider_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Chọn nhà cung cấp--</option>
                    {listprovider.map(provider => (
                        <option key={provider.provider_id} value={provider.provider_id}>
                            {provider.company_name} ({provider.provider_initials})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Dịch vụ</label>
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
            </div>
            <div>
                <label>Giá</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Nhập giá"
                    required
                />
            </div>
            <div>
                <label>Thời gian hoạt động</label>
                <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="Nhập thời gian hoạt động"
                    required
                />
            </div>
            <div>
                <label>Ghi chú</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Nhập ghi chú"
                />
            </div>
            <button type="submit">Lưu dịch vụ nhà cung cấp</button>
        </form>
    );
};

export default AddProviderService;
