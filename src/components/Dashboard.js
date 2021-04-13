import React, { useContext, useState, useEffect } from "react";
import { findByEmail } from '../services/findByEmail.action.js';

import AuthGlobal from '../context/AuthGlobal.js';
import Header from './Header.js'
import Menu from './Menu.js'
import PanelPoll from './PanelPoll.js'
import Authority from './PanelAuthority.js'
import ConfigurationsUI from './PanelConfigurationsUI.js'

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

            <div>

              <div className= "columns">
                <div className="column is-2">
                    <Menu/>

                </div>
                <div className="column is-9 dashboard">

                <section className="hero is-info welcome is-small" style={{"borderRadius": "6px"}}>
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
              <section className="info-tiles margin-top">
            <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">43</p>
                        <p className="subtitle">Polls</p>
                    </article>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">59</p>
                        <p className="subtitle">Authorities</p>
                    </article>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">3</p>
                        <p className="subtitle">UI</p>
                    </article>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">19</p>
                        <p className="subtitle">Reports</p>
                    </article>
                </div>
            </div>
        </section>
                <div className= "columns">
                  <div className="column is-6">
                    <PanelPoll/>
                  </div>
                  <div className="column is-6">
                  <div className="card">
                    <Authority/>
                    </div>
                    <div className="margin-top"></div>
                    <div className="card">
                      <ConfigurationsUI/>
                      </div>
                  </div>
                </div>
                </div>
                <div className="column is-1">


                </div>

              </div>
            </div>


            </div>
        );
    }
}
