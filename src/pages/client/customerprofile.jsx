import React, { useState } from 'react';
import { useEffect } from 'react';
import { getCustomerAPI, getCustomerRequestAPI, getCompanyAPI, updateCustomerAPI , updateCompanyAPI} from '../../util/api';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';
import CustomerRequestsTable from '../../component/forms/customerrequest_table';
const CustomerProfile = () => {   
  const { email } = useParams(); 
  const [haveCompany, setHaveCompany] = useState(false);
  const [requests, setRequests] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const handleUserChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyChange = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await updateCustomerAPI(userInfo);
    if (res?.EC === 0) {
      notification.success({
        message: "Cập nhật thông tin khách hàng thành công",
        description: "Thông tin khách hàng đã được cập nhật thành công",
      });
    } else {
      notification.error({
        message: "Lỗi cập nhật thông tin khách hàng",
        description: res.message || "Không thể cập nhật thông tin khách hàng",
      });
    }
    const res2 = await updateCompanyAPI(companyInfo);
    if (res2?.EC === 0) {
      notification.success({
        message: "Cập nhật thông tin công ty thành công",
        description: "Thông tin công ty đã được cập nhật thành công",
      })}
    else {
      notification.error({
        message: "Lỗi cập nhật thông tin công ty",
        description: res2.message || "Không thể cập nhật thông tin công ty",
      });}
    console.log(companyInfo);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCustomerAPI(email);
      if (res?.EC === 0 && res.customer) {
        setUserInfo(res.customer);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message || 'Unable to fetch customer data',
        });
      }
    };
    fetchUser();
  }, [email]);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await getCompanyAPI(email);
      if (res?.EC === 0 && res.company) {
        setHaveCompany(true);
        setCompanyInfo(res.company);
      } else if (res?.EC === 0 && !res.company) {
        setHaveCompany(false);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message || 'Unable to fetch company data',
        });
      }
    };
    fetchCompany();
  }, [email]);

  useEffect(() => {
    const fetchRequest = async () => {
      const res = await getCustomerRequestAPI(email);
      if (res?.EC === 0) {
        setRequests(res.requests || []);
      } else {
        // Handle error or empty state as needed
      }
    };
    fetchRequest();
  }, [email]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Thông Tin Khách Hàng</h3>
        <div>
          <label>Họ và Tên:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name || ''}
            onChange={handleUserChange}
          />
        </div>

        <div>
          <label>Số Điện Thoại:</label>
          <input
            type="text"
            name="phone_number"
            value={userInfo.phone_number || ''}
            onChange={handleUserChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email || ''}
            onChange={handleUserChange}
          />
        </div>

        {haveCompany && (
          <>
            <h3>Thông tin công ty</h3>
            <div>
              <label>Tên Công Ty:</label>
              <input
                type="text"
                name="company_name"
                value={companyInfo.company_name || ''}
                onChange={handleCompanyChange}
              />
            </div>

            <div>
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={companyInfo.address || ''}
                onChange={handleCompanyChange}
              />
            </div>

            <div>
              <label>Mã số thuế:</label>
              <input
                type="text"
                name="tax_number"
                value={companyInfo.tax_number || ''}
                onChange={handleCompanyChange}
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="company_email"
                value={companyInfo.company_email || ''}
                onChange={handleCompanyChange}
              />
            </div>

            <div>
              <label>Công nợ:</label>
              <input
                type="text"
                name="debt"
                value={companyInfo.debt || ''}
                onChange={handleCompanyChange}
              />
            </div>
          </>
        )}

        <h3>Dịch vụ đã sử dụng</h3>
        <CustomerRequestsTable requests={requests} />

        <h3>Lịch sử giao dịch</h3>
        <button type="submit">Lưu</button>
      </form>
    </>
  );
};
export default CustomerProfile
