import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const RequestTable = ({ initialRequests }) => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setRequests(initialRequests);
    }, [initialRequests]);
    const handleRowClick = (user_id) => {
        navigate(`/profile/${user_id}`);
       };
    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Mã mua hàng</th>
                        <th>Tên dịch vụ</th>
                        <th>Khách hàng</th>
                        <th>Ngày khởi tạo</th>
                        <th>Trạng thái</th>
                        <th>Thành phố</th>
                        <th>Khu vực</th>
                        <th>Deadline</th>
                        <th>Ghi chú</th>
                        <th>Tình trạng thanh toán</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.request_id} onClick={() => handleRowClick(request.user_id)}>
                            <td>{request.request_id}</td>
                            <td>{request.service_name}</td>
                            <td>{request.customer_name}</td>
                            <td>{new Date(request.request_date).toLocaleDateString()}</td>
                            <td>{request.request_status}</td>
                            <td>{request.city}</td>
                            <td>{request.area_type}</td>
                            <td>{new Date(request.deadline).toLocaleDateString()}</td>
                            <td>{request.request_notes || 'Không có ghi chú'}</td>
                            <td>{request.is_paid}</td>
                            <td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestTable;
