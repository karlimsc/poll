import React, { useContext, useState, useEffect } from "react";
import AuthGlobal from '../context/AuthGlobal.js';
import Header from './Header.js'

export default function Dashboard(props) {
    const context = useContext(AuthGlobal);
    const [showChild, setShowChild] = useState(false);
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.history.push("/login");
        }
        setShowChild(true);

        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            fetch("http://localhost:3001/server/usuarios", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: jwt
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUsuarios(data.usuarios)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [context.stateUser.isAuthenticated, props.history]);

    if (!showChild) {
        return null;
    } else {
        return (
            <div>
            <Header/>
              HOLA
            </div>
        );
    }
}
