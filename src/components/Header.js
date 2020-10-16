import React, { useContext } from "react";
import AuthGlobal from "../context/AuthGlobal";
import { logoutUser } from "../services/login.action.js";

export default function Header() {
    const context = useContext(AuthGlobal);
    const cerrarSesion = () => {
        logoutUser(context.dispatch);
    };


    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
              <div class="navbar-dropdown">
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button  className="button is-light" onClick={cerrarSesion}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
);
}
