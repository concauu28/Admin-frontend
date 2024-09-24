import React, { useState } from 'react';
import {addServiceAPI} from '../../util/api'
import { notification } from "antd";
const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    service_id: '',
    service_name: '',
    service_description: '',
    price: 0,
    type_of_service: '',
    completion_time: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
  }
    e.preventDefault();
    console.log(formData)
    try {
      const response = await addServiceAPI(formData)
      console.log('>>>check res',response)
      if (response.EC==0) {
        notification.success({
          message:"Tao dich vu thanh cong",
          description: "success"
      })
        setFormData({
          service_id: '',
          service_name: '',
          service_description: '',
          price: 0,
          type_of_service: '',
          completion_time: '',
          notes: ''
        });
      } else {
        notification.error({
          message: "Loi tao dich vu",
          description: "error"
      })
      }
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: "Loi ",
        description: "error"
    })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Mã Dịch Vụ</label>
        <input
          type="text"
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Tên Dich Vụ</label>
        <input
          type="text"
          name="service_name"
          value={formData.service_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Thông tin về dịch vụ</label>

        <textarea
          name="service_description"
          value={formData.service_description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Chi phí</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Loại dịch vụ </label>
        <input
          type="text"
          name="type_of_service"
          value={formData.type_of_service}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Thời gian hoàn thành </label>
        <input
          type="text"
          name="completion_time"
          value={formData.completion_time}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Ghi chú </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Lưu</button>
    </form>
  );
};

export default AddServiceForm;
