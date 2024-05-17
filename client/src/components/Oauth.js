import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const Oauth = () => {

  const navigate=useNavigate()

  const googleHandler=async()=>{
      
       try {
        const provider= new GoogleAuthProvider()
        const auth=getAuth(app);

        const result = await signInWithPopup(auth,provider);
        // console.log(result)
        const res=await axios.post("/api/v1/users/google",{
             name:result.user.displayName,
             email:result.user.email,
             photo:result.user.photoURL
        });

        message.success("login is successfully");
     //    console.log(res.data)

         localStorage.setItem("user",JSON.stringify({...res.data,password:""}));
         navigate("/")
       } catch (error) {
            console.log("could not register with google",error);
       }
  }

  return (
    <button  type="button"className='btn btn-primary fw-bold bg-danger w-100 m-1 p-3' onClick={googleHandler} >
       Continue With Google
     </button>
  )
}

export default Oauth