import { useState } from "react"
import CsvExporter from "../component/csv/export"
const ReportPage = ()=>{

    const user_headers = [
        { label: "Mã Khách Hàng", key: "customer_id" },
        { label: "Họ và Tên", key: "customer_name" },
        { label: "Quốc Tịch", key: "nationality" },
        { label: "Tên viết tắt", key: "initials" },
        { label: "Ngày khởi tạo", key: "registration_date" },
        { label: "Trạng Thái Khách Hàng", key: "customer_status" },
        { label: "Email Khách Hàng", key: "customer_email" },
        { label: "Số Điện Thoại Khách Hàng", key: "customer_phone" },
        { label: "Mã Công Ty", key: "company_id" },
        { label: "Tên Công Ty", key: "company_name" },
        { label: "Email Công Ty", key: "company_email" },
        { label: "Mã Số Thuế", key: "tax_number" },
        { label: "Ngành Sản Xuất", key: "manufacturing_industry" },
        { label: "Địa Chỉ Công Ty", key: "company_address" },
        { label: "Nợ", key: "debt" },
    ];
    const request_headers = [
        { label: "Mã mua hàng", key: "request_id" },
        { label: "Khách Hàng", key: "customer_name" },
        { label: "Ngày khởi tạo", key: "request_date" },
        { label: "Trạng thái mua hàng", key: "request_status" },
        { label: "Thành Phố", key: "city" },
        { label: "Khu vực", key: "area_type" },
        { label: "Deadline", key: "deadline" },
        { label: "Ghi chú mua hàng", key: "request_notes" },
        { label: "Mã dịch vụ", key: "service_id" },
        { label: "Tên dịch vụ", key: "service_name" },
        { label: "Mô tả dịch vụ", key: "service_description" },
        { label: "Giá dịch vụ", key: "service_price" },
        { label: "Thời gian hoàn thành", key: "completion_time" },
        { label: "Ghi chú dịch vụ", key: "service_notes" },
        { label: "Trạng thái thanh toán", key: "payment_status" },
        { label: "Thanh toán", key: "is_paid" },
    ];
    
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