import React, { useState } from "react";
import { newAuthority } from '../services/newAuthority.action.js';
import  {ButtonBackToHome} from  './ButtonBackToHome.js'

export default function NewConfigurationUI(props) {
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

      <nav className="navbar is-white">
        <div className="container">
            <div className="navbar-brand"></div>
        </div>
      </nav>

      <div className="login-title"> New Authority</div>
  <div className="container">
      <form className="configuration-form" onSubmit={handleSubmit}>
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



    <div className="container">
      <div className="columns"></div>
        <div  className="column is-4"></div>
        <div className="column is-6">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success"  value="Submit">Submit</button>
            </div>
            <div className="control">
              <button className="button is-success is-light">Cancel</button>
            </div>
            {ButtonBackToHome}
        </div> {/* colum 6 */}
      </div> {/* columns */}
   </div> {/* container */}

</form>

  </div>{/* big container */}
</div>
);
    }
