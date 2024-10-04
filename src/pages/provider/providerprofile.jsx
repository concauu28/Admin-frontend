import React, { useState, useEffect } from 'react';
import { getProviderAPI, getProviderServiceAPI, updateProviderAPI, updateProviderServicesAPI } from '../../util/api';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';
import ProviderServiceTable from '../../component/forms/provider_form/servicetable';

const ProviderProfile = () => {
  const { user_id } = useParams(); 
  const [providerInfo, setProviderInfo] = useState({
    company_name: '',
    provider_initials: '',
    tax_number: '',
    debt: '',
    address: '',
    status: ''
  });
  const [providerServices, setProviderServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const handleProviderChange = (e) => {
    const { name, value } = e.target;
    setProviderInfo({
      ...providerInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resProvider = await updateProviderAPI(providerInfo);
    if (resProvider?.EC !== 0) {
      notification.error({
        message: "Error",
        description: resProvider.message || 'Không thể cập nhật thông tin nhà cung cấp',
      });
    }
    else{
      notification.success({
        message: "Success",
        description: "Cập nhật thông tin nhà cung cấp thành công",
      });
    }
    for (let i = 0; i < providerServices.length; i++) {
      const resServices = await updateProviderServicesAPI(providerServices[i])
      if (resServices?.EC !== 0) {
        notification.error({
          message: "Error",
          description: resServices.message || 'hông thể cập nhật dịch vụ của nhà cung cấp',
        });
      }
      else{
        notification.success({
          message: "Success",
          description: "Cập nhật dịch vụ của nhà cung cấp thành công",
        });
      }
    }

    // Add logic for saving provider information and services here
  };

  const handleServiceChange = (updatedServices) => {
    setProviderServices(updatedServices);
  };

  useEffect(() => {
    const fetchProviderData = async () => {
      setIsLoading(true); // Start loading

      const resProvider = await getProviderAPI(user_id);
      const resServices = await getProviderServiceAPI(user_id);

      if (resProvider?.EC === 0 && resProvider.provider) {
        setProviderInfo(resProvider.provider);
      } else {
        notification.error({
          message: "Error",
          description: resProvider.message || 'Unable to fetch provider data',
        });
      }

      if (resServices?.EC === 0) {
        setProviderServices(resServices.provider_services || []);
      } else {
        notification.error({
          message: "Error",
          description: resServices.message || 'Unable to fetch provider services',
        });
      }

      setIsLoading(false); // End loading
    };

    fetchProviderData();
  }, [user_id]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Thông Tin Nhà Cung Cấp</h3>
        <div>
          <label>Tên Công Ty:</label>
          <input
            type="text"
            name="company_name"
            value={providerInfo.company_name || ''}
            onChange={handleProviderChange}
          />
        </div>

        <div>
          <label>Ký hiệu công ty:</label>
          <input
            type="text"
            name="provider_initials"
            value={providerInfo.provider_initials || ''}
            onChange={handleProviderChange}
          />
        </div>

        <div>
          <label>Mã số thuế:</label>
          <input
            type="text"
            name="tax_number"
            value={providerInfo.tax_number || ''}
            onChange={handleProviderChange}
          />
        </div>

        <div>
          <label>Công nợ:</label>
          <input
            type="text"
            name="debt"
            value={providerInfo.debt || ''}
            onChange={handleProviderChange}
          />
        </div>

        <div>
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={providerInfo.address || ''}
            onChange={handleProviderChange}
          />
        </div>

        <div>
          <label>Trạng thái:</label>
          <input
            type="text"
            name="status"
            value={providerInfo.status || ''}
            onChange={handleProviderChange}
          />
        </div>

        {/* Conditionally render the table after data has loaded */}
        {!isLoading && (
          <ProviderServiceTable
            providerService={providerServices}
            onServiceChange={handleServiceChange}
          />
        )}

        <button type="submit">Lưu</button>
      </form>
    </>
  );
};

export default ProviderProfile;
