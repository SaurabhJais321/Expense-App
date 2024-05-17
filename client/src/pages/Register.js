import React, { useState } from 'react'
import{Form,Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Spinner from '../components/Spinner';
import Oauth from '../components/Oauth';


const Register = () => {
const [Loading,setLoading]=useState(false);
   const navigate=useNavigate();
  const submitHandler=async(values)=>{
        try{
              setLoading(true);
              await axios.post("/api/v1/users/register",values)
              setLoading(false);
              message.success("registration is succuessfully")
              navigate("/login");
        }catch{
            setLoading(false); 
            message.error("registration is failed");
        }
  }

  return (
   <>
   {Loading && <Spinner/>}
   <div className='register-page'>
      <Form layout="vertical" onFinish={submitHandler} className='login-form '>
        <h1 className='fw-bolder text-center text-bg-dark p-2 '>Register Form</h1>
        <hr/>
        <Form.Item label="Name" name="name" className='fw-bold'>
          <Input placeholder='Name' className='fw-bold'/>
        </Form.Item>
        <Form.Item label="Email" name="email" className='fw-bold'>
          <Input type="email" placeholder='Email' className='fw-bold'/>
        </Form.Item>
        <Form.Item label="Password" name="password" className='fw-bold'>
          <Input type="password" placeholder='Password' className='fw-bold'/>
        </Form.Item>


      <div><button className='btn btn-primary fw-bold bg-black w-100 m-1 p-3'>Register</button></div>
      <div><Oauth/></div>
        <div className='d-flex gap-3 m-2'>
        Already register?
          <Link to="/login" className='fw-bold text-black'>
            Click here to login
           </Link>
        </div>
      </Form>
   </div>
   </>
  )
};

export default Register;