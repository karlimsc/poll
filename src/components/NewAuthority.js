import React, { useState } from "react";
import Header from './Header.js'
import { newAuthority } from '../services/newAuthority.action.js';

export default function NewAuthority(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const client= { "idClient" : sessionStorage.getItem("id")}

   const changePage= (e) => {
         props.history.push("/");
       }

  const handleSubmit = (e) => {
      const data= {name, email, password, client}
      if (name === "" || email === "" || password === "") {
          alert("Ingrese los datos correctamente");
      } else {
        console.log(data);
          newAuthority(data, setError);
          console.log(error);
          if (error === "")
          changePage();
      }
      e.preventDefault();
    };

      return(
<div className="color-background">
  <Header/>

  <div className="container">
      <form className="configuration-form" onSubmit={handleSubmit}>
          <div className="form-title"> New Authority</div>
      <div className="columns margin-top">
      <div className="column is-2 margin-top">
      </div>
      <div className="column is-8 margin-top">

          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Text input"/>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Text input"/>
            </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input"
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Text input"/>
          </div>
      </div>
    </div>

      </div> {/* columns */}

      <div className="column is-12" style={{display:"grid"}}>
      <button  className="button azul-banner">
      Submit
      </button>
      </div>
</form>

  </div>{/* big container */}
</div>
);
    }
