import { notification, Table } from "antd";
import { useEffect, useState, useNavigate } from "react";
import RequestForm from "../../component/forms/addrequestform";
import RecurringTable from "../../component/forms/recurringrequesttable";
import { getlistCustomerAPI, getServicesAPI, addRequestAPI,getRequestsAPI } from '../../util/api';
const AddRequest = ()=>{
    const [flip, setFlip] = useState(false);
    const [requests, setRequests] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
            const res = await getRequestsAPI();
            if (res.EC===0) {
                setRequests(res.requests);
            } else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                });
            }
        };
        fetchRequests();
    }, [flip]);
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await getlistCustomerAPI()
            if(!res?.message){
                setCustomers(res)
            }
            else{
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUser()
    },[])
    useEffect(()=>{
        const fetchService = async()=>{
            const res = await getServicesAPI()
            if(res.EC===0){
                setServices(res.services)
            }
            else{
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchService()
    },[])
    const handleFirstFormSubmit = async (data) => {
        try {
            const res = await addRequestAPI(data)
            if(res){
                notification.success({
                    message:"Tao don mua hang thanh cong",
                    description: "success"
                    
                })
                setFlip(!flip)
            }
            else{
                notification.error({
                    message: "Loi tao don mua hang",
                    description: "error"
                })
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data.');
        }
    };

    return (
        <div>
            <h1>Bán Hàng </h1>
            <RequestForm 
                customers={customers} 
                services={services} 
                onSubmit={handleFirstFormSubmit} 
            />
            <h1>Tao don lap lai</h1>
            <RecurringTable
                customers={customers} requests={requests} />
        </div>
    );
};

export default AddRequest