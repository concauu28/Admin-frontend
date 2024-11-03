import { useEffect, useState } from "react";
import { notification } from "antd";
import { addEmailRemiderAPI, updateEmailRemiderAPI, getEmailRemiderAPI, deleteEmailRemiderAPI } from "../../util/api";
import EmailReminderTable from "../../component/forms/reminder/reminderemailtable";

const EmailReminderPage = () => {
    const [emailReminders, setEmailReminders] = useState([])
    const user_id = localStorage.getItem("user_id");
    const [formData, setFormData] = useState({
        user_id: user_id, // giả định user_id là không thay đổi
        cron_name: "",
        email: "",
        subject: "",
        message: "",
        cron_time: new Date().toISOString().slice(0, 16),
      });
    const [loading, setLoading] = useState(true);
    const handleReminderChange = (updatedReminders) => {
        setEmailReminders(updatedReminders);
    }
    useEffect(() => {
      const fetchEmailReminders = async () => {
          const res = await getEmailRemiderAPI(user_id);
          if (res.EC === 0) {
              const remindersWithConvertedDate = res.data.map(reminder => ({
                  ...reminder,
                  cron_time: cronToDatetimeLocal(reminder.cron_time), // Convert cron_time to a normal date
              }));
              setEmailReminders(remindersWithConvertedDate);
              console.log(">>check reminder",remindersWithConvertedDate);
              console.log(">>check form time",formData.cron_time);
              setLoading(false);
          }
      };
      fetchEmailReminders();
  }, []);

    const convertToCron = (datetime) => {
        const dateObj = new Date(datetime);
        const minute = dateObj.getMinutes();
        const hour = dateObj.getHours();
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Tháng trong JS bắt đầu từ 0
        const cronExpression = `${minute} ${hour} ${day} ${month} *`; // Bỏ qua ngày trong tuần (dùng *)
        return cronExpression;
    };
    const cronToDatetimeLocal = (cronTime) => {
      const [minute, hour, day, month] = cronTime.split(' ');
      const year = new Date().getFullYear(); // Use the current year
      const date = new Date(year, month - 1, day, hour, minute);
  
      // Format the date to `YYYY-MM-DDTHH:mm` suitable for datetime-local input
      const yearStr = date.getFullYear();
      const monthStr = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
      const dayStr = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
      const hourStr = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hour
      const minuteStr = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minute
  
      return `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
  };
  
  
    // Hàm xử lý để cập nhật dữ liệu form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Hàm xử lý để xóa reminder
    const handleDelete = async (cron_id) => {
        const res = await deleteEmailRemiderAPI(cron_id);
        if (res?.EC === 0) {
            notification.success({
              message: "Đã xóa nhắc nhở email",
              description: "Nhắc nhở email đã được xóa thành công.",
            });
            return true;
        } else {
            notification.error({
              message: "Lỗi khi xóa nhắc nhở email",
              description: res.message || "Không thể xóa nhắc nhở email.",
            });
            return false;
        }
    };

    // Hàm xử lý khi gửi dữ liệu form
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Convert form's cron_time (datetime-local) to cron expression
      const cronExpression = convertToCron(formData.cron_time);
      const updatedFormData = {
          ...formData,
          cron_time: cronExpression,  // Use cron expression for submission
      };
  
      // Add a new email reminder
      const res = await addEmailRemiderAPI(updatedFormData);
      if (res?.EC === 0) {
          notification.success({
              message: "Đã thêm nhắc nhở email",
              description: "Nhắc nhở email đã được thêm thành công.",
          });
      } else {
          notification.error({
              message: "Lỗi khi thêm nhắc nhở email",
              description: res.message || "Không thể thêm nhắc nhở email.",
          });
      }
  
      // Update existing email reminders (convert cron_time back to cron expression before updating)
      for (let index = 0; index < emailReminders.length; index++) {
          // Convert the cron_time of each reminder back to cron format
          const cronExpression = convertToCron(emailReminders[index].cron_time);
  
          // Update the reminder with the correct cron expression
          const updatedReminder = {
              ...emailReminders[index],
              cron_time: cronExpression,  // Convert cron_time to cron expression
          };
  
          const res = await updateEmailRemiderAPI(updatedReminder);
          if (res?.EC === 0) {
              console.log("Nhắc nhở email đã được cập nhật");
          } else {
              notification.error({
                  message: "Lỗi khi cập nhật nhắc nhở email",
                  description: res.message || "Không thể cập nhật nhắc nhở email.",
              });
          }
      }
  };
  

    return (
        <div>
      <h2>Nhắc việc </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên công việc :</label>
          <input
            type="text"
            name="cron_name"
            value={formData.cron_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Thời gian :</label>
          <input
            type="datetime-local"
            name="cron_time"
            value={formData.cron_time}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Nhắc việc đã sử dụng</h3>
        {loading ? (
                <div>Đang tải...</div>
            ) : (
                <EmailReminderTable 
                    initialReminders={emailReminders} 
                    onReminderChanges={handleReminderChange} 
                    onDelete={handleDelete}
                />
            )}
        <button type="submit">Lưu</button>
      </form>
    </div>
    );
}

export default EmailReminderPage;
