import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProviderTable({ data }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  if (!Array.isArray(data)) {
    return <div>No provider data available.</div>;
  }

  const handleRowClick = (user_id) => {
    navigate(`/provider/${user_id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter providers based on search term in initials (Tên viết tắt)
  const filteredData = data.filter((provider) =>
    provider.provider_initials.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Tìm kiếm (Tên viết tắt)"
        value={searchTerm}
        onChange={handleSearch}
      />

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
          {filteredData.length > 0 ? (
            filteredData.map((provider) => (
              <tr key={provider.provider_id} onClick={() => handleRowClick(provider.user_id)}>
                <td>{provider.provider_id}</td>
                <td>{provider.provider_initials}</td>
                <td>{provider.company_name}</td>
                <td>{provider.tax_number || ''}</td>
                <td>{provider.debt}</td>
                <td>{provider.isinternal ? 'Có  ' : 'Không'}</td>
                <td>{provider.address || ''}</td>
                <td>{provider.status || ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No providers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProviderTable;
