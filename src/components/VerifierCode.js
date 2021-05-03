import React, { useState } from "react";
//import axios from 'axios'
import Error from '../components/Error.js';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function VerifierCode(props) {
  console.log(props);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const vertical = 'top';
    const horizontal= 'center';
    //const [data, setData] = useState("");

    const handleSubmit = (e) => {
      //e.preventDefault();
      if(code === "5a22e5")
      props.verifier = code;
      else {
        setError("This code does not match. Please check your email again");
        setOpenSnack(true);
      }
      console.log('entro aqui verifier code');
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnack(false);
    };

           return (
             <Container component="main" maxWidth="xs">
                <div className="paper">
                <Avatar className="avatar">
                 <VpnKeyIcon />
               </Avatar>
                 <Typography component="h1" variant="h5">
                      Verifier Code
                    </Typography>

                     <form className="form-login" onSubmit={handleSubmit}>
                       <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="code"
                          label="Code"
                          name="code"
                          autoComplete="code"
                          onChange={(e) => setCode(e.target.value)}
                          autoFocus
                        />
                          <Button
                          fullWidth
                          className="submit-button"
                          type="submit"
                        >
                          Send Code
                        </Button>

                        <Typography component="h1" variant="h6">
                             Please, check your email.
                        </Typography>
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
