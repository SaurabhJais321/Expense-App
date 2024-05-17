import { UserOutlined, XOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
  const [user,setUser]=useState("");

  const navigate=useNavigate()
   const logoutHandler=()=>{
        localStorage.removeItem("user");
        message.success("Logout successfull");
        navigate('/login')
   }
  
 useEffect(()=>{
  setUser(JSON.parse(localStorage.getItem('user')))
 },[])


  return (
    <><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/"><XOutlined />
              <span className="fw-bold">Expanse Management App</span></Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link active" aria-current="page">
            <span className='fw-bold'>{user.name}</span>
              <img className='m-1 p-1 profile-img' src={user.photo} />
            
            </Link>
          </li>
          <li className="nav-item mt-2">
            <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
        
      </div>
    </div>
  </nav></>
  )
}

export default Header