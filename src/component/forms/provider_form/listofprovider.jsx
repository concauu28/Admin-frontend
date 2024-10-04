import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProviderTable({ data }) {
  const navigate = useNavigate();
  
  if (!Array.isArray(data)) {
    return <div>No provider data available.</div>;
  }

  const handleRowClick = (user_id) => {
    navigate(`/provider/${user_id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Mã nhà cung cấp</th>
          <th>Tên viết tắt</th>
          <th>Tên công ty</th>
          <th>Mã số thuế</th>
          <th>Công nợ</th>
          <th>Nội bộ</th>
          <th>Địa chỉ</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {data.map((provider) => (
          <tr key={provider.provider_id} onClick={() => handleRowClick(provider.user_id)}>
            <td>{provider.provider_id}</td>
            <td>{provider.provider_initials}</td>
            <td>{provider.company_name}</td>
            <td>{provider.tax_number || 'No Tax Number'}</td>
            <td>{provider.debt}</td>
            <td>{provider.isinternal ? 'Yes' : 'No'}</td>
            <td>{provider.address || 'No Address'}</td>
            <td>{provider.status || 'No Status'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProviderTable;
