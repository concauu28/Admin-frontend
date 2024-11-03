import React, { useState, useEffect } from 'react';

const EmailReminderTable = ({ initialReminders, onReminderChanges, onDelete }) => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        setReminders(initialReminders);
    }, [initialReminders]);

    const handleInputChange = (e, cronId) => {
        const { name, value } = e.target;
        // Update the local reminders state
        const updatedReminders = reminders.map(reminder =>
            reminder.cron_id === cronId
                ? { ...reminder, [name]: value }
                : reminder
        );
        setReminders(updatedReminders); // Update the local state
        // Send the updated data to the parent component
        onReminderChanges(updatedReminders);
    };
    const handleDelete = async (cronId) => {
        //Call the delete API function
        const result = await onDelete(cronId);
        if (result) {
            const updatedReminders = reminders.filter(reminder => reminder.cron_id !== cronId);
            setReminders(updatedReminders);
            onReminderChanges(updatedReminders); // Update the parent component with the new state
        } else {
            alert('Failed to delete the reminder');
        }
    };
    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Tên công việc</th>
                        <th>Email</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Thời gian</th>
                        <th>Thời gian khởi tạo</th>
                        <th></th> 
                    </tr>
                </thead>
                <tbody>
                    {reminders.map((reminder) => (
                        <tr key={reminder.cron_id}>
                            <td>
                                <input
                                    type="text"
                                    name="cron_name"
                                    value={reminder.cron_name}
                                    onChange={(e) => handleInputChange(e, reminder.cron_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={reminder.email}
                                    onChange={(e) => handleInputChange(e, reminder.cron_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="subject"
                                    value={reminder.subject}
                                    onChange={(e) => handleInputChange(e, reminder.cron_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="message"
                                    value={reminder.message}
                                    onChange={(e) => handleInputChange(e, reminder.cron_id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="datetime-local"
                                    name="cron_time"
                                    value={reminder.cron_time}
                                    onChange={(e) => handleInputChange(e, reminder.cron_id)}
                                />
                            </td>
                            <td>{new Date(reminder.created_at).toLocaleString()}</td>
                            <td>
                                {/* Delete button */}
                                <button onClick={() => handleDelete(reminder.cron_id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmailReminderTable;
