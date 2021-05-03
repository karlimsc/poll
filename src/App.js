import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import ForgotPassword from './components/ForgotPassword.js';
import RecoverPassword from './components/RecoverPassword.js'
import Auth from './context/Auth.js';
import NewPoll from './components/NewPoll.js';
import NewConfigurationUI from './components/NewConfigurationUI.js'
import NewAuthority from './components/NewAuthority.js'
import DataTableAuth from './components/DatatableAuth.js'
import DataTableConfig from './components/DatatableConfig.js'
import DataTablePoll from './components/DatatablePoll.js'
import Header from './components/Header.js'
import Questions from './components/questions.js'
import {PollEdit} from './components/PollEdit.js'
import BarChart from './components/Reports.js'

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
                    <Route path="/ForgotPassword" component={ForgotPassword} />
                    <Route path="/RecoverPassword" component={RecoverPassword} />
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/poll" component={NewPoll} />
                    <Route path="/pollEdit/:id" component={PollEdit} />
                    <Route path="/configurationUI" component={NewConfigurationUI} />
                    <Route path="/authority" component={NewAuthority} />
                    <Route path="/authorities" component={DataTableAuth} />
                    <Route path="/configurationUIList" component={DataTableConfig} />
                    <Route path="/polls" component={DataTablePoll} />
                    <Route path="/header" component={Header}></Route>
                    <Route path="/questions" component={Questions}></Route>
                    <Route path="/reports" component={BarChart}></Route>
                </Switch>
            </BrowserRouter>
        </Auth>
    );
}

export default App;
