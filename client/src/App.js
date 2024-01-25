import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Issuer from "./Components/Org_Apply/Issuer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/Edit_Issuer_Details" element={<Issuer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
