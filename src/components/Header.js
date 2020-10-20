import React, { useContext } from "react";
import AuthGlobal from "../context/AuthGlobal";
import { logoutUser } from "../services/login.action.js";

export default function Header() {
    const context = useContext(AuthGlobal);
    const cerrarSesion = () => {
        logoutUser(context.dispatch);
    };


    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-dropdown">
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button  className="button is-light" onClick={cerrarSesion}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
);
}
