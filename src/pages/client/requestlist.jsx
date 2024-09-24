import { notification, Table } from "antd";
import { useEffect, useState, useNavigate } from "react";
import { getRequestsAPI } from "../../util/api";
import RequestTable from "../../component/forms/requeststable";
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

    const handleSaveChanges = (modifiedRequests) => {
        // Here you can send the modified requests to the backend to update the database
        console.log('Modified Requests:', modifiedRequests);
    };
    return (
        <div>
            <h1>Danh sách mua hàng </h1>
            <RequestTable initialRequests={initialRequests} onSaveChanges={handleSaveChanges} />
        </div>
    );
}
export default RequestPage