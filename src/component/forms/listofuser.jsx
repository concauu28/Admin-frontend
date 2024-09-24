import React from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerTable({ data }) {
  const navigate = useNavigate();
  console.log(data);
  if (!Array.isArray(data)) {
    return <div>No customer data available.</div>;
  }

  const handleRowClick = (customer_email) => {
    navigate(`/profile/${customer_email}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Mã khách hàng</th>
          <th>Tên viết tắt</th>
          <th>Tên khách hàng</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Quốc tịch</th>
          <th>Ngày khởi tạo</th>
          <th>Trạng thái</th>
          <th>Tên tài khoản</th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer) => (
          <tr key={customer.customer_id} onClick={() => handleRowClick(customer.email)}>
            <td>{customer.customer_id}</td>
            <td>{customer.initials}</td>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone_number}</td>
            <td>{customer.nationality}</td>
            <td>{customer.registration_date ? new Date(customer.registration_date).toLocaleDateString() : 'No Request'}</td> 
            <td>{customer.status || 'No Status'}</td>
            <td>{customer.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;