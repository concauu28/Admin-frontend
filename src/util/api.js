import axios from "./axios.customize"

const createEmployeeAPI = (name,email,password,phone_number,department)=>{
    
    const URL_API="/registerinternal"
    const data={
        "name": name,
        "email": email,
        "password": password,
        "phone_number": phone_number,
        "role": "Employee",
        "department": department,
        "status": "Active"
    }
    return axios.post(URL_API,data)
}
const addCustomerAPI = (data)=>{
    const userinfo=data
    const URL_API='/registercustomer'
    return axios.post(URL_API,userinfo)
}
const updateCustomerAPI = (data)=>{
    const email=data.email
    const userinfo=data.info
    const URL_API = `/updatecustomer/${email}`
}
const addCompanyAPI = (data)=>{
    const companyInfo=data
    const URL_API='/registercompany'
    return axios.post(URL_API,companyInfo)
}
const addRequestAPI = (data)=>{
    const request= data
    const URL_API='/postrequest'
    return axios.post(URL_API,request)
}
const addServiceAPI = (data)=>{
    const service = data
    const URL_API='/addservice'
    return axios.post(URL_API, service)
}
const addRecurringRequestAPI = (data)=>{
    const request= data
    const URL_API='/recurringrequest'
    return axios.post(URL_API,request)
}

const loginAPI = (email,password)=>{
    
    const URL_API="/login"
    const data={
        "email": email,
        "password": password,
    }
    return axios.post(URL_API,data)
}
const getUserAPI = ()=>{
    
    const URL_API="/user"
    return axios.get(URL_API)
}

const getlistCustomerAPI = ()=>{
    const URL_API=`/user`
    return axios.get(URL_API)
}

const getCustomerAPI = (email)=>{
    const useremail=email
    const URL_API=`/getcustomer/${useremail}`
    return axios.get(URL_API)
}
const getCustomerRequestAPI = (email)=>{
    const useremail=email
    const URL_API=`/getcustomerreq/${useremail}`
    return axios.get(URL_API)
}
const getServicesAPI = ()=>{
    const URL_API=`/getservices`
    return axios.get(URL_API)
}
const getRequestsAPI = ()=>{
    const URL_API=`/getrequests`
    return axios.get(URL_API)
}
const getCompanyAPI = (email)=>{
    const userEmail=email
    const URL_API=`/getcompany/${userEmail}`
    return axios.get(URL_API)
}

export{
    createEmployeeAPI,addRequestAPI,
    loginAPI,getUserAPI, getCustomerAPI, getlistCustomerAPI, getCustomerRequestAPI, addCustomerAPI, addCompanyAPI,
    getServicesAPI,getCompanyAPI, getRequestsAPI, addServiceAPI, addRecurringRequestAPI
}