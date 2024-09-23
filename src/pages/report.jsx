import { useState } from "react"
import CsvExporter from "../component/csv/export"
const ReportPage = ()=>{

    const user_headers = [
        { label: "Ma khach Hang", key: "customer_id" },
        { label: "Ho va Ten", key: "name" },
        { label: "So Dien Thoai", key: "phone_number" },
        { label: "Email", key: "email" },
        { label: "Quoc Tich", key: "nationality" },
        { label: "Ngay khoi tao", key: "registration_date" },
        { label: "Trang Thai", key: "status" },
    ];
    const request_headers=[
        { label: "Ma mua hang", key: "request_id" },
        { label: "Khach Hang", key: "customer_name" },
        { label: "Ngay khoi tao", key: "request_date" },
        { label: "Trang thai mua hang", key: "request_status" },
        { label: "Thanh Pho", key: "city" },
        { label: "Khu vuc", key: "area_type" },
        { label: "Deadline", key: "deadline" },
        { label: "Ghi chu mua hang", key: "request_notes" },
        { label: "Gia dich vu", key: "service_price" },
        { label: "Thoi gian hoan thanh", key: "completion_time" },
        { label: "Ghi chu dich vu", key: "service_notes" },
        { label: "Thanh toan", key: "is_paid" },

    ]
    return <div>
        <div>
        <span>Danh sach Khach Hang</span>
        <CsvExporter data={0} header={user_headers}/>
        </div>
        <div>
            <span>Bao cao Cong viec</span>
            <CsvExporter data={1} header={request_headers}/>

        </div>
        
    </div>
}
export default ReportPage