import { useContext, useEffect } from "react";
import Header from "./component/layout/header";
import { Outlet } from "react-router-dom";
import axios from "./util/axios.customize"
import { AuthContext } from "./component/context/auth.context";
import { Spin } from 'antd';
function App() {
  const {auth,setAuth, appLoading, setAppLoading}=useContext(AuthContext);
  useEffect(()=>{
    const fetchAccount = async () =>{
      setAppLoading(true);
      const res = await axios.get(`/getaccount/`)
      if(res){
        setAuth({
          isAuthenticated: true,
          user:{
              email:res.email,
              name: res.name
          }
        })
      }
      setAppLoading(false)
    }
    fetchAccount()
  },[])
  
  return (
    <div className="App">
      {appLoading==true? 
      <div >
        <Spin/>
      </div>
      :
      <>      
      <Header/>
      <Outlet/>
      </>
      }

    </div>
  );
}

export default App;
