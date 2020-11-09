import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Auth from './context/Auth.js';
import NewPoll from './components/NewPoll.js';
import NewConfigurationUI from './components/NewConfigurationUI.js'
import NewAuthority from './components/NewAuthority.js'
import DataTableComp from './components/DatatableComp.js'
import Header from './components/Header.js'

import './App.css';
import 'bulma/css/bulma.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {
    return (
        <Auth>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/poll" component={NewPoll} />
                    <Route path="/configurationUI" component={NewConfigurationUI} />
                    <Route path="/authority" component={NewAuthority} />
                    <Route path="/authorities" component={DataTableComp} />
                    <Route path="/header" component={Header}></Route>
                </Switch>
            </BrowserRouter>
        </Auth>
    );
}

export default App;
