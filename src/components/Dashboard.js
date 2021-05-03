import React, { useContext, useState, useEffect } from "react";
import { findByEmail } from '../services/findByEmail.action.js';
import AuthGlobal from '../context/AuthGlobal.js';
import DashboardClient from './DashboardClient.js'
import DashboardAdmin from './DashboardAdmin.js'

export default function Dashboard(props) {
    const context = useContext(AuthGlobal);
    const [showChild, setShowChild] = useState(false);
    const [email , setEmail]= useState("")

    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.history.push("/login");
        }
        setShowChild(true);

        setEmail(sessionStorage.getItem("email"));
        findByEmail(sessionStorage.getItem("email"));

    }, [context.stateUser.isAuthenticated, props.history, email]);

    if (!showChild) {
        return null;
    } else {
      if(email === 'admin@gmail.com'){
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
