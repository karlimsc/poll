import React, { useState, useEffect} from "react";
import axios from 'axios'
import Error from '../components/Error.js';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Modal from 'react-bootstrap/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function RecoverPassword(props) {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, seterror] = useState("");
    const [data, setData] = useState("");
    const [showResp, setShowResp] = useState(false);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const vertical = 'top';
    const horizontal= 'center';

    useEffect( ()=>{
      if(data !== ""){
        console.log(data);
        setMessage("Your password was changed!");
        setShowResp(true);
    }
  }, [data, props.history]);

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

    const changePage= (e) => {
      props.history.push("/login");
   }

    const HandleSubmit = (e) => {
      e.preventDefault();
      const name = sessionStorage.getItem("name");
      const jwt = sessionStorage.getItem("jwt2")
      let config = {
       headers: {
         'Authorization': 'Bearer ' + jwt
         }
       }

      const dataJson = {name, password};

      if(password === password2){
        axios.put('http://155.138.233.164:8084/client/update/'+sessionStorage.getItem("id"),
         dataJson, config)
        .then(res => {
                setData(res.data);
             })
             .catch(error=>{
               seterror(error);
               setMessage('Network error. Try again a few minutes later');
               setShowResp(true);
             })
      }
      else{
        seterror("Sorry, both passwords must match");
        setOpenSnack(true);
      }
    }

              return (
             <Container component="main" maxWidth="xs">
                <div className="paper">
                <Avatar className="avatar">
                 <VpnKeyIcon />
               </Avatar>
                 <Typography component="h1" variant="h5">
                      Recover Password
                    </Typography>
                     <form className="form-login" onSubmit={HandleSubmit}>
                       <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="password"
                          label="New Password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          onChange={(e) => setPassword(e.target.value)}
                          autoFocus
                        />
                        <TextField
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           type="password"
                           id="password2"
                           label="Confirm Password"
                           name="password2"
                           autoComplete="password2"
                           onChange={(e) => setPassword2(e.target.value)}
                         />
                         <Button
                         fullWidth
                         className="submit-button"
                         type="submit"
                       >
                         Send Password
                       </Button>
                    </form>
                </div>

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

                </Container>
         );}
