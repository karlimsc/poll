import React, { useState } from "react";
import {useEffect} from "react";
import {useLocation} from "wouter"
import useUser from '../hooks/useUser.js'
import "./Login.css";

export default function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation()
  const {isLoginLoading, hasLoginError, login, isLogged} = useUser()

  useEffect(() => {
    if (isLogged) {
      navigate('/')
      onLogin && onLogin()
    }
  }, [isLogged, navigate, onLogin])

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
};

  return (
    <>
    {isLoginLoading && <strong>Checking credentials...</strong>}
    {!isLoginLoading &&
    <form className="login-form" onSubmit={handleSubmit}>
    <h1 className="login-title">Login</h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control-button-login">
            <button  className="button is-success"  disabled={!validateForm()}>
              Login
            </button>
          </p>
        </div>
    </form>
  }
  {
      hasLoginError && <strong>Credentials are invalid</strong>
  }
  </>
);
}
