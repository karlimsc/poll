import React, { useState } from "react";
import Header from './Header.js'
import Menu from './Menu.js'
import Modal from 'react-bootstrap/Modal'
import { newAuthority } from '../services/newAuthority.action.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function NewAuthority(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState("");
  const [showResp, setShowResp] = useState(false);
  const client= { "idClient" : sessionStorage.getItem("id")}
  const vertical = 'top';
  const horizontal= 'center';

   const changePage= (e) => {
         props.history.push("/");
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const hideModalResp = () => {
    setShowResp(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

      const data= {name, email, password, client}
      if (name === "" || email === "" || password === "") {
        setOpenSnack(true);
      } else {
        newAuthority('/authority',data,
                   (response) => {
                       setError(response.status);
                       console.log(response.status);
                   },
                   (error) => {setError(error)})
                   console.log(error);
          if(error  === 201)
          setShowResp(true);
    }
    };

      return(
<div className="color-background">
  <Header/>

  <div className="columns">
    <div className="column is-2">
        <Menu/>

    </div>
    <div  className="column is-9 dashboard" style={{paddingTop:"3%"}}>

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
      <div className="field" style={{paddingTop:"1%"}}>
        <button  className="button azul-banner">
        Submit
        </button>
      </div>
    </div>

      </div> {/* columns */}

</form>

<Modal
   show={showResp}
   onHide={hideModalResp}
   backdrop="static"
   keyboard={false}
 >
 <Modal.Header closeButton>
 </Modal.Header>
   <Modal.Body>
     <div className="container">
      <p>Authority was created successfully. </p>
   </div>
   </Modal.Body>
   <Modal.Footer>
       <button className="button is-success" onClick={changePage}>ok</button>
   </Modal.Footer>
 </Modal>

<Snackbar className="tab" open={openSnack} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={16000} onClose={handleCloseSnack}>
      <Alert onClose={handleCloseSnack} severity="error">
        There are empty fields!
      </Alert>
</Snackbar>

  </div>
  </div>{/* big container */}
</div>
);
    }
