import React, { useEffect, useContext, useState } from "react";
import AuthGlobal from '../context/AuthGlobal.js';
import { loginUser } from '../services/login.action.js';
import Error from '../components/Error.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'


export default function Login(props) {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const [showChild, setShowChild] = useState(false);
    const url_fp="/ForgotPassword";

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
          console.log(context.stateUser.isAuthenticated)
            props.history.push("/");
        }
        setShowChild(true);
    }, [context.stateUser.isAuthenticated, props.history]);

    const handleSubmit = e => {
        const user = {
            email,
            password
        };
        if (email === "" || password === "") {
            seterror("Ingrese datos correctamente");
        } else {
            loginUser(user, context.dispatch, seterror);
        }

        e.preventDefault();
    };

    if (!showChild) {
           return null;
       } else {
           return (
             <Container component="main" maxWidth="xs">

                <div className="paper">
                  <Avatar className="avatar">
                   <LockOutlinedIcon />
                 </Avatar>
                 <Typography component="h1" variant="h5">
                      Sign in
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
                        <TextField
                         variant="outlined"
                         margin="normal"
                         required
                         fullWidth
                         name="password"
                         label="Password"
                         type="password"
                         id="password"
                         onChange={(e) => setPassword(e.target.value)}
                         autoComplete="current-password"
                        />
                          <Button
                          fullWidth
                          className="submit-button"
                          type="submit"
                        >
                          Sign In
                        </Button>
                        <Grid container>
                           <Grid item xs>
                             <Link href={url_fp} variant="body2">
                                  Forgot password?
                                </Link>
                           </Grid>
                         </Grid>
                           {error ? <Error mensaje={error} /> : null}

                    </form>
                </div>
                </Container>
         );
     }
 }
