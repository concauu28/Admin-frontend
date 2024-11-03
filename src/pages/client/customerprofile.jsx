import React, { useState, useEffect } from 'react';
import { getCustomerAPI, getCustomerRequestAPI, getCompanyAPI, updateCustomerAPI, updateCompanyAPI, uploadDocumentAPI, updateRequestAPI} from '../../util/api';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';
import CustomerRequestsTable from '../../component/forms/customer_form/customerrequest_table';
import FileUploader from '../../component/file/fileuploader'; // Import FileUploader component
import DocumentList from '../../component/file/documentlist';

const CustomerProfile = () => {
  const {user_id} = useParams();
  const [loading, setLoading] = useState(true);  
  const [haveCompany, setHaveCompany] = useState(false);
  const [requests, setRequests] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null); // State for uploaded file
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

  const handleFileSelect = (file) => {
    setUploadedFile(file); // Store selected file in state
  };
  const handleReqChange = (updatedRequests) => {
    setRequests(updatedRequests);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update customer and company information first
    const res = await updateCustomerAPI(userInfo);
    if (res?.EC === 0) {
      notification.success({
        message: 'Cập nhật thông tin khách hàng thành công',
        description: 'Thông tin khách hàng đã được cập nhật thành công',
      });
    } else {
      notification.error({
        message: 'Lỗi cập nhật thông tin khách hàng',
        description: res || 'Không thể cập nhật thông tin khách hàng',
      });
      console.log(res);
    }

    const res2 = await updateCompanyAPI(companyInfo);
    if (res2?.EC === 0) {
      notification.success({
        message: 'Cập nhật thông tin công ty thành công',
        description: 'Thông tin công ty đã được cập nhật thành công',
      });
    } else {
      notification.error({
        message: 'Lỗi cập nhật thông tin công ty',
        description: res2.message || 'Không thể cập nhật thông tin công ty',
      });
    }
    // Update request information
    for (let index = 0; index < requests.length; index++) {
      const res3 = await updateRequestAPI(requests[index]);
      if (res3?.EC === 0) {
      } else {
        notification.error({
          message: 'Lỗi cập nhật ',
          description: res3.message || 'Không thể cập nhật thông tin dịch vụ',
        });
      }
      
    }
    


    // If a file is uploaded, handle it using FormData
    if (uploadedFile) {
      const res1 = await uploadDocumentAPI({doc:uploadedFile, user_id:user_id});
      if (res1?.EC === 0) {
        notification.success({
          message: 'Tải tài liệu lên thành công',
          description: 'Tài liệu đã được tải lên thành công',
        });
      } else {
        notification.error({
          message: 'Lỗi tải tài liệu lên',
          description: res1.message || 'Không thể tải tài liệu lên',
        });}
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCustomerAPI(user_id);
      if (res?.EC === 0 && res.customer) {
        setUserInfo(res.customer);
      } else {
        notification.error({
          message: 'Unauthorized',
          description: res.message || 'Unable to fetch customer data',
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await getCompanyAPI(user_id);
      if (res?.EC === 0 && res.company) {
        setHaveCompany(true);
        setCompanyInfo(res.company);
      } else if (res?.EC === 0 && !res.company) {
        setHaveCompany(false);
      } else {
        notification.error({
          message: 'Unauthorized',
          description: res.message || 'Unable to fetch company data',
        });
      }
    };
    fetchCompany();
  }, []);

  useEffect(() => {
    const fetchRequest = async () => {
      const res = await getCustomerRequestAPI(user_id);
      if (res?.EC === 0) {
        setRequests(res.requests);
        setLoading(false);  
      }
    };
    fetchRequest();
  },[]);
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
          <label>Tên viết tắt:</label>
          <input
            type="text"
            name="initials"
            value={userInfo.initials || ''}
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
        <div>
        <label>Quốc tịch  </label>
          <input
            type="text"
            name="nationality"
            value={userInfo.nationality || ''}
            onChange={handleUserChange}
          />
        </div>
        <div>
          <label>Ghi chú:</label>
          <input
            type="text"
            name="note"
            value={userInfo.note || ''}
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
              <label>Ngành nghề kinh doanh sản xuất :</label>
              <input
                type="text"
                name="manufacturing_industry"
                value={companyInfo.manufacturing_industry || ''}
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
            <div>
              <label>Ghi chú :</label>
              <input
                type="text"
                name="note"
                value={companyInfo.note || ''}
                onChange={handleCompanyChange}
              />
            </div>
          </>
        )}
        <h3>
          Tài Liệu đã tải lên
        </h3>
        <DocumentList user_id={user_id} /> 
        <h3>Tải Tài Liệu Lên</h3>
        <FileUploader onFileSelect={handleFileSelect} /> 

        <h3>Dịch vụ đã sử dụng</h3>
        {loading ? (  // Check if loading is true
                <div>Loading...</div>  // Display a loading message while data is being fetched
            ) : (
                <CustomerRequestsTable 
                    initialRequests={requests} 
                    onReqChanges={handleReqChange} 
                />
            )}
        <button type="submit">Lưu</button>
      </form>
    </>
  );
};

export default CustomerProfile;
