import { notification } from "antd";
import { useEffect, useState } from "react";
import { getRequestsAPI } from "../../util/api";
import RequestTable from "../../component/forms/customer_form/requeststable";
const RequestPage = ()=>{
    const [initialRequests, setinitialRequests]= useState([])
    // const navigate = useNavigate();
    useEffect(()=>{
        const fetchRequests = async()=>{
            const res = await getRequestsAPI()
            console.log(res)
            if(res.EC===0){
                setinitialRequests(res.requests)
            }
            else{
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchRequests()
    },[])
    return (
        <div>
            <h1>Danh sách mua hàng </h1>
            <RequestTable initialRequests={initialRequests}/>
        </div>
    );
}
export default RequestPage