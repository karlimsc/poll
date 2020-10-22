import React, { useContext, useState, useEffect } from "react";
import { findByEmail } from '../services/findByEmail.action.js';

import AuthGlobal from '../context/AuthGlobal.js';
import Header from './Header.js'
import Menu from './Menu.js'
import PanelPoll from './PanelPoll.js'

export default function Dashboard(props) {
    const context = useContext(AuthGlobal);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.history.push("/login");
        }
        setShowChild(true);

        const jwt =sessionStorage.getItem("jwt");
        const email = sessionStorage.getItem("email");

        if (jwt) {
          findByEmail(email);
          console.log(sessionStorage.getItem("name"))
      }
    }, [context.stateUser.isAuthenticated, props.history]);

    if (!showChild) {
        return null;
    } else {
        return (
            <div className="color-background">
            <Header/>
            <div className="container">
              <div className= "columns">
                <div className="column is-3">
                  <Menu/>
                </div>
                <div className="column is-9">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>

                    </ul>
                </nav>
                <section className="hero is-info welcome is-small">
                  <div className="hero-body">
                      <div className="container">
                          <h1 className="title">
                              Hello, {sessionStorage.getItem("name")} .
                          </h1>
                          <h2 className="subtitle">
                              I hope you are having a great day!
                          </h2>
                      </div>
                  </div>
              </section>
                <div className= "columns">
                  <div className="column is-6">
                  <PanelPoll/>
                  </div>
                </div>
                </div>

              </div>
            </div>


            </div>
        );
    }
}
