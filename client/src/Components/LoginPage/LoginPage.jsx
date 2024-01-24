import React, { useState } from "react";
import "./LoginPage.css";
import Axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { username, password } = formData;

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
      "http://127.0.0.1:8000/api/auth/login/",
      formData,
      config
    );
<<<<<<< HEAD
    console.log(response.data);
    if (response.data.message == "Login successful") {
      setIsLoggedIn(true);
    } else {
      setErrormsg(response.data.message);
=======
    console.log(response.data.message);
    if(response.data.message=="Login successful"){
      setIsLoggedIn(true);
    }else{
      setErrormsg(response.data.message)
>>>>>>> c0e49230fb7fdba44a035c215066d2264fa2fd36
    }
  };

  return (
    <>
      <div className="background">
        <form onSubmit={onSubmitHandler}>
          <h3>Login Here</h3>
<<<<<<< HEAD
          {isLoggedIn ? (
            <p className="errormsg">123</p>
          ) : (
            <p className="errormsg">{errormsg}</p>
          )}
=======
          {isLoggedIn ? <p className="errormsg">123</p> : <p className="errormsg">{errormsg}</p>}
>>>>>>> c0e49230fb7fdba44a035c215066d2264fa2fd36
          <label htmlFor="username">Username</label>
          <input
            onChange={onChangeInput}
            value={username}
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={onChangeInput}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
          <button type="submit">Log In</button>
          <a href="/register">Create a account</a>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
