import React, { useState, useEffect } from 'react';

const RequestTable = ({ initialRequests, onSaveChanges }) => {
    const [requests, setRequests] = useState([]);
    const [modifiedRequests, setModifiedRequests] = useState({});

    useEffect(() => {
        setRequests(initialRequests);
    }, [initialRequests]);

    const handleInputChange = (e, requestId) => {
        const { name, value } = e.target;

        // Update the requests state with the new value
        setRequests(prevRequests =>
            prevRequests.map(request =>
                request.request_id === requestId
                    ? { ...request, [name]: value }
                    : request
            )
        );

        // Track the changes in modifiedRequests
        setModifiedRequests(prevModifiedRequests => ({
            ...prevModifiedRequests,
            [requestId]: {
                ...prevModifiedRequests[requestId],
                [name]: value
            }
        }));
    };

    const handleSaveChanges = () => {
        onSaveChanges(modifiedRequests);
        setModifiedRequests({});
    };

    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Mã mua hàng </th>
                        <th>Tên dịch vụ</th>
                        <th>Khách hàng </th>
                        <th>Ngày khởi tạo </th>
                        <th>Trạng thái</th>
                        <th>Thành phố </th>
                        <th> Khu vực</th>
                        <th>Deadline</th>
                        <th>Ghi chú</th>
                        <th>Tình trạng thanh toán</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{request.service_name}</td>
                            <td>{request.customer_name}</td>
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
                            <td>
                                <input
                                    type="text"
                                    name="request_notes"
                                    value={request.request_notes || ''}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="is_paid"
                                    value={request.is_paid}
                                    onChange={(e) => handleInputChange(e, request.request_id)}
                                />
                            </td>
                            <td>
                                {/* Add any actions like delete or additional actions here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSaveChanges} disabled={Object.keys(modifiedRequests).length === 0}>
                Luu thay doi
            </button>
        </div>
    );
};

export default RequestTable;
