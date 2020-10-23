import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Auth from './context/Auth.js';
import {NewPoll} from './components/NewPoll.js';
import Header from './components/Header.js'

import './App.css';
import 'bulma/css/bulma.css'

function App() {
    return (
        <Auth>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/poll" component={NewPoll} />
                    <Route path="/header" component={Header}></Route>
                </Switch>
            </BrowserRouter>
        </Auth>
    );
}

export default App;
