import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
       if(localStorage.getItem("user")){
           return children;
       }
       else{
           return <Navigate to="/login"/>
       }
}

export default ProtectedRoutes