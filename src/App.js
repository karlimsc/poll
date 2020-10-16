import React from 'react';
import Login from "./components/Login";

import { UserContextProvider } from "./context/UserContext";

import './App.css';
import 'bulma/css/bulma.css'

function App() {
  return (
    <UserContextProvider>
      <div className="App">
      <Login/>
      </div>
    </UserContextProvider>
  );
}

export default App;
