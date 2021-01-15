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
  const [patternEmail, setPatternEmail]= useState(false);
  const [patternName, setPatternName]= useState(false);
  const [message, setMessage] = useState('');
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

  const handleChangeEmail = (e) =>{
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if(pattern.test(e.target.value)){
      console.log('entra en handleChangeEmail')
      setEmail(e.target.value);
      setPatternEmail(true);
    }
    else {
      setPatternEmail(false);
    }
  }

  const handleChangeName = (e) =>{
    var pattern = new RegExp("^[a-zA-Z ]+$");
    console.log('entra en handleChangeName')
    if(pattern.test(e.target.value)){
      setName(e.target.value);
      setPatternName(true);
    }
    else {setPatternName(false)}
  }


  const handleSubmit = (e) => {
    e.preventDefault();

      const data= {name, email, password, client}
      if(!patternEmail){
        setError("There are errors on Email input");
        setOpenSnack(true);
      }else if(!patternName){
          setError("There are errors on Name input");
          setOpenSnack(true);
        }
        else if( patternName && patternEmail){

        newAuthority('/authority',data,
                   (response) => {
                       setError(response.status);
                      if(response.status === 201){
                      setMessage('Authority was created.');
                      setShowResp(true);}
                      else {
                        setMessage('Network error. Try again a few minutes later')
                        setShowResp(true);
                      }
                   },
                   (error) => {setError(error); console.log(error)})
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
              onChange={handleChangeName}
              placeholder="Text input"/>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input"
              type="text"
              name="email"
              onChange={handleChangeEmail}
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
      <p>{message}</p>
   </div>
   </Modal.Body>
   <Modal.Footer>
       <button className="button is-success" onClick={changePage}>ok</button>
   </Modal.Footer>
 </Modal>

<Snackbar className="tab" open={openSnack} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={16000} onClose={handleCloseSnack}>
      <Alert onClose={handleCloseSnack} severity="error">
        {error}
      </Alert>
</Snackbar>


  </div>
  </div>{/* big container */}
</div>
);
    }
