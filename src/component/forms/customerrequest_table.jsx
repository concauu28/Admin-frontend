import React from 'react';

const CustomerRequestsTable = ({ requests }) => {
    return (
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Mã mua hàng </th>
                    <th>Khởi tạo</th>
                    <th>Trạng thái </th>
                    <th>Thành phố </th>
                    <th>Khu vực </th>
                    <th>Deadline</th>
                    <th>Mã dịch vụ</th>
                    <th>Tên dịch vụ</th>
                    <th>Thông tin dịch vụ</th>
                    <th>Chi phí</th>
                    <th>Thời gian hoàn thành</th>
                    <th>Ghi chú dịch vụ </th>
                    <th>Thanh toán</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request) => (
                    <tr key={request.request_id}>
                        <td>{request.request_id}</td>
                        <td>{new Date(request.request_date).toLocaleDateString()}</td>
                        <td>{request.request_status}</td>
                        <td>{request.city}</td>
                        <td>{request.area_type}</td>
                        <td>{new Date(request.deadline).toLocaleDateString()}</td>
                        <td>{request.service_id}</td>
                        <td>{request.service_name}</td>
                        <td>{request.service_description}</td>
                        <td>${request.service_price}</td>
                        <td>{request.completion_time}</td>
                        <td>{request.service_notes || 'N/A'}</td>
                        <td>{request.is_paid}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerRequestsTable;
