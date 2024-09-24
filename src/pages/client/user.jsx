import { notification, Table } from "antd";
import { useEffect, useState, useNavigate } from "react";
import { getlistCustomerAPI } from "../../util/api";
import CustomerTable from "../../component/forms/listofuser";
const UserPage = ()=>{
    const [dataSource, setDataSource]= useState([])
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await getlistCustomerAPI()
            if(!res?.message){
                setDataSource(res)
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
    return(
        <div>
            <CustomerTable data={dataSource}/>
        </div>
    )
}
export default UserPage