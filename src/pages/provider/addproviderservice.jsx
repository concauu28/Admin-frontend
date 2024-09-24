import React, { useState, useEffect } from 'react';
import AddProviderService from '../../component/forms/provider_form/addservice';
import { getlistProviderAPI, getServicesAPI, addProviderServiceAPI } from '../../util/api';
import { notification } from 'antd';

const AddProviderServicePage = () => {
    const [listprovider, setListProvider] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getlistProviderAPI();
            if (res.EC === 0) {
                setListProvider(res.list_providers);
            } else {
                notification.error({
                    message: "Không được phép",
                    description: res.message
                });
            }
        };
        fetchProviders();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            const res = await getServicesAPI();
            if (res.EC === 0) {
                setServices(res.services);
            } else {
                notification.error({
                    message: "Không được phép",
                    description: res.message
                });
            }
        };
        fetchServices();
    }, []);

    const handleAddProviderService = async (formData) => {
        try {
            const res = await addProviderServiceAPI(formData);
            if(res.EC === 0) {
                notification.success({
                    message: "Thêm dịch vụ nhà cung cấp thành công",
                    description: "Dịch vụ nhà cung cấp đã được thêm thành công"
                });
            }
            else{
                notification.error({
                    message: "Lỗi thêm dịch vụ nhà cung cấp",
                    description: res.message
                });
            }

        } catch (error) {
            return notification.error({
                message: "Lỗi thêm dịch vụ nhà cung cấp",
                description: error.message
            });
        }
    };

    return (
        <div>
            <h1>Thêm dịch vụ nhà cung cấp</h1>
            <AddProviderService 
                listprovider={listprovider} 
                services={services} 
                onSubmit={handleAddProviderService} 
            />
        </div>
    );
};

export default AddProviderServicePage;
