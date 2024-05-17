import React from 'react'
import{Form,Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import Oauth from '../components/Oauth';
// import Oauth from '../components/Oauth';


const Login = () => {
  const navigate=useNavigate();
   const [Loading,setLoading]=useState(false);
   const submitHandler=async(values)=>{
        try {
          setLoading(true);
          const {data}=await axios.post("/api/v1/users/login",values);
          setLoading(false);
          message.success("login is successfully");
          setLoading(false);
          // console.log(data);

           localStorage.setItem("user",JSON.stringify({...data.user,password:""}));
           navigate("/");

        } catch (error) {
          setLoading(false);
          message.error("login is failed");
        }
   }
  return (
    <>
    {Loading && <Spinner/>}
<div className='login-page' onFinish={submitHandler}>
      <Form className='login-form' layout="vertical" onFinish={submitHandler}  >
        <h1 className='fw-bolder text-center text-bg-dark p-2  '>Login Form</h1>
        <hr/>
        <Form.Item label="Email" name="email" className='fw-bold'>
          <Input type="email" placeholder='Email' className='fw-bold'/>
        </Form.Item>
        <Form.Item label="Password" name="password" className='fw-bold'>
          <Input type="password" placeholder='Password' className='fw-bold'/>
        </Form.Item>

       <div><button className='btn btn-primary fw-bold bg-black w-100 m-1 p-3'>Login</button></div>
       <div> <Oauth/></div>
        <div className='d-flex gap-3 m-2'>
        If not register? 
          <Link to="/register " className='fw-bold text-black'>
            Click here to register
           </Link>   
        </div>
      </Form>
   </div>
   </>
    
  )
}

export default Login