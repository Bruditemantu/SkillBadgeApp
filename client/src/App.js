import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginComponent/LoginPage";
import O_Dash from "./Components/Org-Dashboard/O_Dash";
import UserPage from "./Components/User-Dash/UserPage";
import EditProfile from "./Components/User-Dash/EditProfile";
import AllBadges from "./Components/User-Dash/AllBadges";
import SingleBadge from "./Components/Org-Dashboard/SingleBadge/SingleBadge";
import SignUpPage from "./Components/SignupComponent/SignUpPage";
import VerifyBadge from "./Components/Org-Dashboard/VerifyBadge";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
