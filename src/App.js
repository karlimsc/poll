import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Auth from './context/Auth.js';

import './App.css';
import 'bulma/css/bulma.css'

function App() {
    return (
        <Auth>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </Auth>
    );
}

export default App;
