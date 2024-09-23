import React from 'react';

function PendingRequests({ data }) {
  // Filter the data to count pending requests
  const pendingRequestsCount = data.filter(customer => customer.request_status === 'Pending').length;

  return (
    <div>
      <h1>Tien do cong viec</h1>
      <p>So dich vu chua hoan thanh: {pendingRequestsCount}</p>
    </div>
  );
}

export default PendingRequests;
