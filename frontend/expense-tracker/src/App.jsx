import React from 'react'

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Userprovider from './context/userContext';
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
    <Userprovider>
    <div>
      <Router>
        <Routes>
         <Route path='/' element={<Root/>}/>
         <Route path="/login" exact element={<Login/>}/>
         <Route path="/SignUp" exact element={<SignUp/>}/>
         <Route path="/dashboard" exact element={<Home/>}/>
         <Route path="/Income" exact element={<Income/>}/>
        <Route path="/Expense" exact element={<Expense/>}/>
        </Routes>
      </Router>
    </div>

    <Toaster 
    toastOptions={{
      className:"",
      style:{
        fontSize:'13px'
      },
    }}
    />
    </Userprovider>
  )
}

export default App;

const Root =() =>{
  // check if tocken exists in localStorage
  const isAuthenticated =!!localStorage.getItem("tocken");

  // Redirected to dashboard if authenticated, otherwise to login
  return isAuthenticated?(
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/Login"/>
  );
};