import React, { useState , useEffect } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Error from '../components/Error.js';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VerifierCode from './VerifierCode.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {IP} from './Connection.js';


export default function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState("");
    const [verifier, setVerifier] = useState(false);
    const [code , setCode] = useState("");
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const vertical = 'top';
    const horizontal= 'center';

    useEffect( ()=>{
      if(data !== ""){
        setVerifier(true);
    }
  },[data]);


    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnack(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.get(IP+':8084/client/forgotPassword/?email='+email).then(res => {

          const token = res.data.token;
          sessionStorage.setItem("jwt2", token);
          setData(res.data);
        })
        .catch(error=>{
             if(error.response.status === 401){
               setError('This email is not in our records');
               setOpenSnack(true);
             }
             else{
               setError('Network error. Try again a few minutes later');
               setOpenSnack(true);
             }
           })
    };

    const handleChangeCode = event => setCode(event.target.value);
    //const handleChangePassword = event => setCode(event.target.value);

          if(verifier){
          return(
          <VerifierCode verifier={code} onChangeVerifier={handleChangeCode}/>);
          }
          if(props.location["search"] === "?code=5a22e5")
            return(
            <Redirect to="/RecoverPassword" />
            )
          else
           return (
             <Container component="main" maxWidth="xs">
                <div className="paper">
                <Avatar className="avatar">
                 <VpnKeyIcon />
               </Avatar>
                 <Typography component="h1" variant="h5">
                      Forgot Password
                    </Typography>
                     <form className="form-login" onSubmit={handleSubmit}>
                       <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          autoFocus
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
                <Snackbar className="tab" open={openSnack} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={16000} onClose={handleCloseSnack}>
                      <Alert onClose={handleCloseSnack} severity="error">
                        {error}
                      </Alert>
                </Snackbar>
                </Container>
         );


     }
