import React, { useEffect, useContext, useState } from "react";
import AuthGlobal from '../context/AuthGlobal.js';
import { loginUser } from '../services/login.action.js';
import Error from '../components/Error.js';
import './Login.css';

export default function Login(props) {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
          console.log(context.stateUser.isAuthenticated)
            props.history.push("/");
        }
        setShowChild(true);
    }, [context.stateUser.isAuthenticated, props.history]);

    const handleSubmit = e => {
        const user = {
            email,
            password
        };
        if (email === "" || password === "") {
            seterror("Ingrese datos correctamente");
        } else {
            loginUser(user, context.dispatch, seterror);
        }

        e.preventDefault();
    };


    if (!showChild) {
           return null;
       } else {
           return (
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
                          <button  className="button is-success">
                            Login
                          </button>
                           {error ? <Error mensaje={error} /> : null}
                        </p>
                      </div>
                  </form>
         );
     }
 }
