import React, { useReducer, useEffect,useState } from "react";
import authReducer from '../hooks/reducer.js';
import { setCurrentUser } from '../services/login.action.js';
import AuthGlobal from '../context/AuthGlobal.js'
import jwt_decode from "jwt-decode";

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        if (localStorage.jwt) {
            const decoded = localStorage.jwt ? localStorage.jwt : "";
            dispatch(setCurrentUser(jwt_decode(decoded)));
        }
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        );
    }
};

export default Auth;
