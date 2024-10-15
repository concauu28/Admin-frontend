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
const addProviderAPI = (data)=>{
    const userinfo=data
    const URL_API='/registerprovider'
    return axios.post(URL_API,userinfo)
}
const updateCustomerAPI = (data)=>{
    const userinfo=data
    const URL_API = `/updatecustomer/`
    return axios.put(URL_API,userinfo)
}
const updateCompanyAPI = (data)=>{
    const companyInfo=data
    const URL_API = `/updatecompany`
    return axios.put(URL_API,companyInfo)
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
const addProviderServiceAPI = (data)=>{
    const service = data
    const URL_API='/addproviderservice'
    return axios.post(URL_API, service)
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
const getlistProviderAPI = ()=>{
    const URL_API=`/getlistprovider`
    return axios.get(URL_API)
}
const getProviderAPI = (id)=>{
    const userid=id
    const URL_API=`/getprovider/${userid}`
    return axios.get(URL_API)
}
const getProviderServiceAPI = (user_id)=>{
    const URL_API=`/getproviderservice/${user_id}`
    return axios.get(URL_API)
}

const updateProviderAPI = (data)=>{
    const providerInfo=data
    const URL_API=`/updateprovider`
    return axios.put(URL_API,providerInfo)
}
const updateProviderServicesAPI = (data)=>{
    const providerServices=data
    const URL_API=`/updateproviderservice`
    return axios.put(URL_API,providerServices)
}
const reportUserAPI = ()=>{
    const URL_API=`/reportuser`
    return axios.get(URL_API)
}
const uploadDocumentAPI = (data)=>{
    const formData = new FormData();
    formData.append('file', data.doc); 
    formData.append('email', data.email);
    const URL_API=`/uploaddoc`
    return axios.post(URL_API,formData,{headers: {"Content-Type": "multipart/form-data"}})
}
const getDocumentAPI = (email)=>{
    const userEmail=email
    const URL_API=`/getdocuments/${userEmail}`
    return axios.get(URL_API)
}
const deleteDocumentAPI =async (doc_name)=>{
    const response = await axios.delete('/deletedoc', {
        data: { doc_name }, // Pass body inside `data`
      });
      return response;
}

export{
    createEmployeeAPI,addRequestAPI, addProviderAPI, updateCustomerAPI,
    loginAPI,getUserAPI, getCustomerAPI, getlistCustomerAPI, getCustomerRequestAPI, addCustomerAPI, addCompanyAPI,
    getServicesAPI,getCompanyAPI, getRequestsAPI, addServiceAPI, addRecurringRequestAPI, getlistProviderAPI, 
    addProviderServiceAPI, updateCompanyAPI, reportUserAPI, getProviderAPI, getProviderServiceAPI
    ,updateProviderAPI,updateProviderServicesAPI, uploadDocumentAPI, getDocumentAPI, deleteDocumentAPI
}