import { notification, Table } from "antd";
import { useEffect, useState, useNavigate } from "react";
import { getlistProviderAPI } from "../../util/api";
import ProviderTable from "../../component/forms/provider_form/listofprovider";
const ProviderPage = ()=>{
    const [dataSource, setDataSource]= useState([])
    useEffect(()=>{
        const fetchProvider = async()=>{
            const res = await getlistProviderAPI()
            if(res.EC===0){
                setDataSource(res.list_providers)
            }
            else{
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchProvider()
    },[])
    return(
        <div>
            <ProviderTable data={dataSource}/>
        </div>
    )
}
export default ProviderPage