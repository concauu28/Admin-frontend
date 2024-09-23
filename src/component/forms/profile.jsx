import React from 'react';
import CustomerRequestsTable from '../component/forms/request_table';
function Profile({ data }) {

  return (
    <>
    <form onSubmit={handleSubmit}>
  <h3>Thong Tin Khach Hang</h3>
  <div>
    <label>Họ và Tên:</label>
    <input
      type="text"
      name="name"
      defaultValue={userInfo.customer_name}
      onChange={handleChange}
    />
  </div>

  <div>
    <label>Số Điện Thoại:</label>
    <input
      type="text"
      name="phone"
      defaultValue={userInfo.phone_number}
      onChange={handleChange}
    />
  </div>

  <div>
    <label>Email:</label>
    <input
      type="email"
      name="email"
      defaultValue={userInfo.customer_email}
      onChange={handleChange}
    />
  </div>

  <h3>Thông tin công ty</h3>

  <div>
    <label>Ten Cong Ty:</label>
    <input
      type="text"
      name="companyName"
      defaultValue={userInfo.company_name}
      onChange={handleChange}
    />
  </div>
  <div>
    <label>Địa chỉ:</label>
    <input
      type="text"
      name="companyAddress"
      defaultValue={userInfo.address}
      onChange={handleChange}
    />
  </div>

  <div>
    <label>Mã số thuế:</label>
    <input
      type="text"
      name="taxNumber"
      defaultValue={userInfo.tax_number}
      onChange={handleChange}
    />
  </div>

  <div>
    <label>Email:</label>
    <input
      type="email"
      name="companyEmail"
      defaultValue={userInfo.company_email}
      onChange={handleChange}
    />
  </div>
  <div>
    <label>Cong no:</label>
    <input
      type="text"
      name="debt"
      defaultValue={userInfo.debt}
      onChange={handleChange}
    />
  </div>



  <h3>Dich vu da su dung</h3>
  <CustomerRequestsTable requests={request} />
  <h3>Lich su giao dich</h3>
  <button type="submit">Luu</button>
</form>
  </>
  );
}

export default Profile;
