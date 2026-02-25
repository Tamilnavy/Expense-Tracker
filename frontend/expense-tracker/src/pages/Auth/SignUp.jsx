import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate,Link} from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import {validateEmail} from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';




const SignUp = () => {
  const [profilepic,setprofilepic]=useState(null);
  const [fullname,setFullname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const[error,setError]=useState(null);


const {updateUser} = React.useContext(UserContext);
  const navigate=useNavigate();
  // Handle signUp form submit
  const handleSignup=async(e)=>{
    e.preventDefault();

    let profileImageUrl ="";

    if (!fullname){
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)){
      setError("please enter a valid email address");
      return;
    }

    if(!password){
      setError("please enter the password");
      return;
    }

    setError("");

    // SignUp API call
    try{

      // Upload image if present
      if(profilepic){
        const imageUploadRes = await uploadImage(profilepic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName: fullname,
      email,
      password,
      profileImageUrl
    }); 

    const { token, user } = response.data;

    if(token){
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }
  } catch (error){
    if (error.response && error.response.data.message){
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again");
    }
  }
  };


  return (
    <AuthLayout>
      <div className="
          lg:w-full
          h-auto
          md:h-full
          mt-10
          md:mt-0
          flex
          flex-col
          justify-center
        ">

        <h3 className="text-xl font-semibold text-black"> Creaate an Account</h3>
        <p className="text-xs text-slate-700 mt-5px mb-6">
          Join as today by entering your details below.
        </p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilepic} setImage={setprofilepic}/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              value={fullname}
              onChange={({target})=>setFullname(target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <Input
              value={email}
              onChange={({target})=>setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="text"
            />

            <div className="col-span-2">
            <Input
              value={password}
              onChange={({target})=>setPassword(target.value)}
              label="password"
              placeholder="min 8 Characters"
              type="password"
            />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                  <button type="submit" className="btn-primary">
                    SIGN UP 
                  </button>
                  <p className="text-[13px] text-slate-800 mt-3">
                    Already have an accounnt?{" "}
                    <Link className="font-medium text-primary underline" to="/Login">
                    Login
                    </Link>
                    </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default SignUp