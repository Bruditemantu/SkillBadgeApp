import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginComponent/LoginPage";
// import UserPage from "./Components/UserDetail/UserPage";

import SignupPage from "./Components/SignupPage/SignupPage";
import AOS from "aos";
import EditBadge from "./Components/Org-Dashboard/EditBadge";

//organisation 
import O_Dash from "./Components/Org-Dashboard/O_Dash";
import EditProfile from "./Components/EditProfile/EditProfile";
import AllBadges from "./Components/AllBadges/AllBadges";

// user
import UserEditProfile from "./Components/User-Dash/UserEditProfile";
import UserProfile from "./Components/User-Dash/UserProfile";
import UserAllBadges from "./Components/User-Dash/UserAllBadges";
import CreateBadge from "./Components/Org-Dashboard/CreateBadge";

import { useEffect } from "react";

import "aos/dist/aos.css";
import AssignBadge from "./Components/Org-Dashboard/AssignBadge";
import UserPage from "./Components/User-Dash/UserPage";
import EditProfile from "./Components/User-Dash/EditProfile";
import AllBadges from "./Components/User-Dash/AllBadges";
import SingleBadge from "./Components/Org-Dashboard/SingleBadge/SingleBadge";
import SignUpPage from "./Components/SignupComponent/SignUpPage";
import VerifyBadge from "./Components/Org-Dashboard/VerifyBadge";

function App() {
  useEffect(()=>{
    AOS.init();
  })
  return (

    
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/allbadges" element={<AllBadges/>} />
        <Route path="/orgdash" element={<O_Dash/>} />
        <Route path="/createbadge" element={<CreateBadge/>} />
        <Route path="/assignbadge" element={<AssignBadge/>} />
        


        <Route path="/editbadge" element={<EditBadge/>} />
         


        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/editprofile" element={<UserEditProfile/>} />
        <Route path="/user/allbadges" element={<UserAllBadges/>} />

        
        
       
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/orgdash" element={<O_Dash />} />
        <Route path="/userdash" element={<UserPage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/allbadges" element={<AllBadges />} />
        <Route path="/singlebadge" element={<SingleBadge/>}/>
        <Route path="/verify-badge/:id" element={<VerifyBadge/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
