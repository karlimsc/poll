import React, { useContext, useState, useEffect } from "react";
import { findByEmail } from '../services/findByEmail.action.js';
import AuthGlobal from '../context/AuthGlobal.js';
import DashboardClient from './DashboardClient.js'
import DashboardAdmin from './DashboardAdmin.js'

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
      if(sessionStorage.getItem("email") === 'admin@gmail.com'){
        return (
            <DashboardAdmin/>
        );}
        else{
          return (
            <DashboardClient/>
          );
        }
      }

}
