import {getServicesAPI,updateServiceAPI} from "../../util/api";
import ServicesTable from "../../component/forms/service_form/services_table";
import {useEffect, useState} from "react";
import {notification} from "antd";
const ServiceListPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchService = async()=>{
            const res = await getServicesAPI()
            if(res.EC===0){
                setServices(res.services)
                setLoading(false)
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
    const handleServiceChanges = async (servicechange) => {
        setServices(servicechange);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        for (let index = 0; index < services.length; index++) {
            const res = await updateServiceAPI(services[index]);
            if (res.EC == 0) {
                console.log("Update service successfully");
            }
        };}

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <h1>Service page</h1>
            {loading? <p>Loading...</p>: 
            <ServicesTable initialServices={services} onServiceChanges = {handleServiceChanges}/>}
            <button type="submit">Submit</button>
        </div>
        </form>
    );
}
export default ServiceListPage;