import { useState } from "react";
import React from "react";
import "./SignupPage.css";
import Axios from "axios";
import {useNavigate} from "react-router-dom"

const SignupPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    contact_info: "",
    confirm_password: "",
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { username, password, name, email, contact_info, confirm_password } =
    formData;

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
    await Axios.post("http://127.0.0.1:8000/api/auth/signup/", formData, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Successfully Registered.") {
          setIsSignedIn(true);
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
        if (error.response.data.message == "Invalid Credentials") {
          if (error.response.data.error.hasOwnProperty("non_field_errors")) {
            setErrormsg(error.response.data.error.non_field_errors);
            return;
          } else {
            setErrormsg(error.response.data.error.username);
            return;
          }
        } else {
          setErrormsg(error.response.data.message);
          return;
        }
      });
  };

  return (
    <>
      <div className="background">
        <form onSubmit={onSubmitHandler}>
          <h3>Register Here</h3>
          {isSignedIn ? (
            <p className="errormsg">Registration Successful</p>
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
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                value={confirm_password}
                onChange={onChangeInput}
                type="text"
                placeholder="Enter Confirm Password"
                id="confirm_password"
                name="confirm_password"
                required
              />
            </div>
          </div>
          <button type="submit">Sign Up</button>
          <a href="/login">Already Registered? Sign-In</a>
        </form>
      </div>
    </>
  );
};

export default SignupPage;