import React, { useState, useEffect } from 'react';

const CustomerRequestsTable = ({ initialRequests, onReqChanges }) => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        setRequests(initialRequests);
    },[]);
    const handleInputChange = (e, requestId) => {
        const { name, value } = e.target;
        // Update the local requests state
        const updatedRequests = requests.map(request =>
            request.request_id === requestId
                ? { ...request, [name]: value }
                : request
        );
        
        setRequests(updatedRequests);  // Update the local state
        // Send the updated data to the parent component
        onReqChanges(updatedRequests);
    };
    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Mã mua hàng</th>
                        <th>Khởi tạo</th>
                        <th>Trạng thái</th>
                        <th>Thành phố</th>
                        <th>Khu vực</th>
                        <th>Deadline</th>
                        <th>Mã dịch vụ</th>
                        <th>Tên dịch vụ</th>
                        <th>Thông tin dịch vụ</th>
                        <th>Chi phí</th>
                        <th>Ghi chú dịch vụ</th>
                        <th>Thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{new Date(request.request_date).toLocaleDateString()}</td>
                            <td>
                                <input
                                    type="text"
                                    name="request_status"
                                    value={request.request_status}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="city"
                                    value={request.city}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="area_type"
                                    value={request.area_type}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={new Date(request.deadline).toISOString().slice(0, 10)}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                            <td>{request.service_id}</td>
                            <td>{request.service_name}</td>
                            <td>{request.service_description}</td>
                            <td>{request.service_price}</td>
                            <td>{request.service_notes || ''}</td>
                            <td>
                                <input
                                    type="text"
                                    name="is_paid"
                                    value={request.is_paid}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerRequestsTable;
