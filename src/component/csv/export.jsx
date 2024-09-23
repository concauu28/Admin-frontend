import React, { useState,useEffect } from 'react';
import { notification } from 'antd';
import { CSVLink, CSVDownload } from "react-csv";
import { getlistCustomerAPI,getRequestsAPI } from '../../util/api';
const CsvExporter = (code) => {
    const [data,setData]=useState([])
    const fetchUser = async()=>{
        const res = await getlistCustomerAPI()
        if(!res?.message){
            setData(res)
        }
        else{
            notification.error({
                message: "Unauthorized",
                description: res.message
            })
        }
    }
    const fetchRequests = async()=>{
        const res = await getRequestsAPI()
        if(!res?.message){
            setData(res.requests)
        }
        else{
            notification.error({
                message: "Unauthorized",
                description: res.message
            })
        }
    }

    useEffect(()=>{
        if(code.data==0){
            fetchUser()
        }
        else if (code.data==1){
            fetchRequests()
        }
        
    },[])
    
  return <CSVLink data={data} headers={code.header}>Download me</CSVLink>;;
};

export default CsvExporter;
