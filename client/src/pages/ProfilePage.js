import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useRef } from "react";
import Layout from "../components/layout/Layout";
import {message} from 'antd'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import axios from 'axios'

const ProfilePage = () => {
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
   const [photo,setPhoto] = useState(user.photo);


  console.log(filePerc);
  const navigate= useNavigate()


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setPhoto(downloadURL)
        );
      }
    );
  };

  const handleSubmit=async()=>{
    try {
       const res= await axios.post("/api/v1/users/update",{name,email,photo:photo,userId:user._id});
      
       localStorage.setItem("user",JSON.stringify({...res.data,password:""}));
       message.success("User Updated Successfully")
       
       navigate("/")
       navigate("/profile");    
    } catch (error) {
       console.log(error)
    }
  }

  const deleteHandler=async()=>{
      try {
        const res= await axios.post("/api/v1/users/delete",{userId:user._id})
        localStorage.clear("user");
        message.success(res.data.msg);
        navigate("/login")
        
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <Layout>
      <section
        className="vh-100 justify-content-between"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-4">
              <h1 className="text-center mt-5">Profile</h1>
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body text-center">
                  <div className="text-bg-dark p-3 m-2">{user.name}</div>
                  <div className="mt-3 mb-4">
                    <input
                      onChange={(e) =>handleFileUpload(e.target.files[0])}
                      type="file"
                      ref={fileRef}
                      hidden
                      accept="image/*"
                    />
                    <img
                      onClick={() => fileRef.current.click()}
                      src={user.photo}
                      alt="profile"
                      className="userProfile"
                      style={{ width: 100,cursor:"pointer" }}
                    />

                     <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-danger'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-success'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

                  </div>

                  <div className="d-grid gap-3">
                    <input
                      placeholder="Name"
                      value={name}
                      className="fw-bolder  p-3 w-100"
                      style={{ borderRadius: "5px" }}
                      onChange={(e) => setName(e.target.value)}
                    />
                   

                    <input
                      placeholder="Email"
                      value={email}
                      className="fw-bolder p-3 w-100"
                      style={{ borderRadius: "5px" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn text-bg-dark btn-rounded btn-lg w-100"

                      onClick={handleSubmit}
                    >
                      Update Profile
                    </button>
                  </div>

                 <button type="button" className="m-2 p-2 w-100 btn text-danger" onClick={deleteHandler} >Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
