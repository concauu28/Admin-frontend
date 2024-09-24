import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../component/context/auth.context';
const HomePage = ()=>{
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext)
    useEffect(()=>{
        if (!auth.isAuthenticated) {
            navigate("/login");
        }
    },[auth])

    return(
        <div>
                  <h1>Hoang Tu</h1>
        </div>
    )
}
export default HomePage