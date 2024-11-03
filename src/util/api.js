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
const updateRequestAPI = (data)=>{
    const request= data
    const URL_API='/updaterequest'
    return axios.put(URL_API,request)}
const updateServiceAPI = (data)=>{
    const service = data
    const URL_API='/updateservice'
    return axios.put(URL_API, service)
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

const getCustomerAPI = (id)=>{
    const user_id=id
    const URL_API=`/getcustomer/${user_id}`
    return axios.get(URL_API)
}
const getCustomerRequestAPI = (id)=>{
    const user_id=id
    const URL_API=`/getcustomerreq/${user_id}`
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
    formData.append('user_id', data.user_id);
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

const addEmailRemiderAPI = (data)=>{
    const emailRemider = data
    const URL_API='/schedule'
    return axios.post(URL_API,emailRemider)
}
const getEmailRemiderAPI = (data)=>{
    const user_id = data
    const URL_API=`/getspecificjob/${user_id}`
    return axios.get(URL_API)
}
const updateEmailRemiderAPI = (data)=>{
    const emailRemider = data
    const URL_API='/updatejob'
    return axios.put(URL_API,emailRemider)
}
const deleteEmailRemiderAPI = (data)=>{
    const id = data
    const URL_API=`/deletejob/${id}`
    return axios.delete(URL_API)
}


export{
    createEmployeeAPI,addRequestAPI, addProviderAPI, updateCustomerAPI,
    loginAPI,getUserAPI, getCustomerAPI, getlistCustomerAPI, getCustomerRequestAPI, addCustomerAPI, addCompanyAPI,
    getServicesAPI,getCompanyAPI, getRequestsAPI, addServiceAPI, addRecurringRequestAPI, getlistProviderAPI, 
    addProviderServiceAPI, updateCompanyAPI, reportUserAPI, getProviderAPI, getProviderServiceAPI
    ,updateProviderAPI,updateProviderServicesAPI, uploadDocumentAPI, getDocumentAPI, deleteDocumentAPI,
    updateRequestAPI, addEmailRemiderAPI, getEmailRemiderAPI, updateEmailRemiderAPI, deleteEmailRemiderAPI,
    updateServiceAPI
}