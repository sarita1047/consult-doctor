import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import APIServices from "../apiUtils/APIServices";
import "../assets/styles/login.css";
const Login = () => {
  const history = useHistory();
  const [page, setPage] = useState("login");

  const submitHandler = (e, callBack) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id) data[a.id] = a.value;
      } else isValid = false;
    });

    isValid && callBack(data);
  };

  const onLogin = async (data) => {
    const { success } = await new APIServices("auth/loginAdmin").post(data);
    if (success) {
      history.push("/dashboard");
    }
  };

  const onSignup = async (data) => {
    const { success } = await new APIServices("admin").post(data);
    if (success) {
      setPage("login");
    }
  };
  return (
    <div className="page">
      <div className="container border col col-3 p-0 shadow">
        <div
          className="login"
          onClick={(_) => setPage("login")}
          style={{ backgroundColor: page === "login" ? "#34b3a0" : "#fff" }}
        >
          Log In
        </div>
        <div
          className="signup"
          onClick={(_) => setPage("signup")}
          style={{ backgroundColor: page !== "login" ? "#34b3a0" : "#fff" }}
        >
          Sign Up
        </div>

        {page === "login" ? (
          <LoginWrapper onSubmit={(e) => submitHandler(e, onLogin)} />
        ) : (
          <SignupWrapper onSubmit={(e) => submitHandler(e, onSignup)} />
        )}
      </div>
    </div>
  );
};

export default Login;

const SignupWrapper = ({ onSubmit }) => {
  return (
    <form
      className="signup-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <input
        type="text"
        required
        placeholder="Enter your Name"
        className="input"
        id="name"
      />
      <br />
      <input
        type="email"
        required
        placeholder="Your Email Address"
        className="input"
        id="email"
      />

      <br />
      <input
        type="password"
        required
        placeholder="Choose a Password"
        className="input"
        id="password"
      />
      <br />

      <button className="btn btn-info" type="submit">
        Create account
      </button>
    </form>
  );
};

const LoginWrapper = ({ onSubmit }) => {
  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <input
        type="email"
        id="email"
        placeholder="Email or Username"
        className="input"
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        className="input"
        id="password"
        required
      />
      <br />

      <button className="link btn btn-info" type="submit">
        Login
      </button>
    </form>
  );
};
