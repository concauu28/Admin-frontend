import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerTable({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  if (!Array.isArray(data)) {
    return <div>No customer data available.</div>;
  }

  const handleRowClick = (user_id) => {
    navigate(`/profile/${user_id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter customers based on search term in initials (Tên viết tắt)
  const filteredData = data.filter((customer) =>
    customer.initials.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Tìm kiếm(Tên viết tắt)"
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <table>
        <thead>
          <tr>
            <th>Mã khách hàng</th>
            <th>Tên khách hàng</th>
            <th>Tên viết tắt</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Quốc tịch</th>
            <th>Ngày khởi tạo</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((customer) => (
              <tr key={customer.user_id} onClick={() => handleRowClick(customer.user_id)}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>{customer.initials}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.email}</td>
                <td>{customer.nationality}</td>
                <td>{customer.registration_date ? new Date(customer.registration_date).toLocaleDateString() : 'No Request'}</td> 
                <td>{customer.status || 'No Status'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Không có khách hàng </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
