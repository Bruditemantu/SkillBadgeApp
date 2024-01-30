import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
// import SignupPage from "./Components/SignupPage/SignupPage";
import UserPage from "./Components/UserDetail/UserPage";
import EditProfile  from "./Components/EditProfile/EditProfile";
import AllBadges from "./Components/AllBadges/AllBadges";
import AOS from "aos";

import { useEffect, useInsertionEffect } from "react";


function App() {
  useEffect(()=>{
    AOS.init();
  })
  return (

    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<SignupPage />} /> */}
        <Route path="/user" element={<UserPage />} />
        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/allbadges" element={<AllBadges/>} />
        
        
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
