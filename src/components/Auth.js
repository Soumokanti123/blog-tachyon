import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export const Auth = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://tachyon-backend-production-3687.up.railway.app/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))

        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) =>
          localStorage.setItem("userId", data.user._id)
        )
        
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div className="box">
      <h2>{isSignup ? "SIGNUP" : "LOGIN"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <div className="user-box">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                required="true"
              />
              <label>Name</label>
            </div>
            <br />
          </>
        )}
        <div className="user-box">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            required="true"
          />
          <label>Email ID</label>
        </div>

        <div className="user-box">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            required="true"
          />
          <label>Password</label>
        </div>

        <div className="btnbox">
          <input className="btn" type="submit" value="SUBMIT" />
          <input
            className="btn"
            onClick={() => setIsSignup(!isSignup)}
            type="button"
            value={isSignup ? "LOGIN" : "SIGNUP"}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
