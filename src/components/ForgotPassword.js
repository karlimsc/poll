import React, { useState } from "react";
import axios from 'axios'
import Error from '../components/Error.js';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const [error, seterror] = useState("");
    const [data, setData] = useState("");

    const handleSubmit = (e) => {
      //e.preventDefault();
      console.log('entro aqui',email);
      axios.get('http://localhost:8084/client/forgotPassword/?email='+email).then(res => {
              setData(res.data);
              console.log(res.data);
           })
           .catch(error=>{
               console.log("Ha ocurrido un error");
           })
    };
        if(data !== "1")
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

                           {error ? <Error mensaje={error} /> : null}

                    </form>
                </div>
                </Container>
         );
         else{
           return (
             <Container component="main" maxWidth="xs">
                <div className="paper">
                <Avatar className="avatar">
                 <VpnKeyIcon />
               </Avatar>
                 <Typography component="h1" variant="h5">
                      Code
                    </Typography>
                     <form className="form-login" onSubmit={handleSubmit}>
                       <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Code"
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

                           {error ? <Error mensaje={error} /> : null}

                    </form>
                </div>
                </Container>
         );

         }
     }
