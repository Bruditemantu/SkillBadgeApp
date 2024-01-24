import { useState } from "react";
import React from "react";
import "./SignupPage.css";
import Axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    contact_info:"",
    cnfrmpass:"",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { username, password, name, email } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await Axios.post(
      "http://127.0.0.1:8000/api/auth/signup/",
      formData,
      config
    );
    console.log(response.data.message);
    if (response.data.message == "Login successful") {
      setIsLoggedIn(true);
    } else {
      setErrormsg(response.data.message);
    }
  };

  return (
    <>
      <div className="background">
        <form onSubmit={onSubmitHandler}>
          <h3>Register Here</h3>
          {isLoggedIn ? (
            <p className="errormsg">123</p>
          ) : (
            <p className="errormsg">{errormsg}</p>
          )}
          <div className="form-feilds">
            <div className="left">
              <label htmlFor="username">Name</label>
              <input
                onChange={onChangeInput}
                value={name}
                type="text"
                placeholder="Enter Name"
                name="name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={onChangeInput}
                type="email"
                placeholder="Enter Email"
                id="email"
                name="email"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={onChangeInput}
                type="password"
                placeholder="Enter Password"
                id="password"
                name="password"
                required
              />
            </div>
            <div className="right">
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={onChangeInput}
                type="text"
                placeholder="Enter Username"
                id="username"
                name="username"
                required
              />
              <label htmlFor="contact_info">Contact Info</label>
              <input
                value={contact_info}
                onChange={onChangeInput}
                type="text"
                placeholder="Enter Contact Info"
                id="contact_info"
                name="contact_info"
                required
              />
              <label htmlFor="cnfrmpass">Confirm Password</label>
              <input
                value={cnfrmpass}
                onChange={onChangeInput}
                type="text"
                placeholder="Enter Confirm Password"
                id="cnfrmpass"
                name="cnfrmpass"
                required
              />
            </div>
          </div>
          <button type="submit">Log In</button>
          <a href="/login">Already Registered? Sign-In</a>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
