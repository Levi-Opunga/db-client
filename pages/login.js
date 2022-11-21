import * as React from "react";
import { useState, useEffect, Redirect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "./api/client";
import Router from "next/router";



function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Group 12
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [retry, setRetry] = useState(false);

  const [loggedUser, setLoggedUser] = useState([{
    name:"",
    password: ""
  }]);
  const [formData, setFormData] = useState([
    {
      name: "",
      password: "",
    },
  ]);

  // useEffect(() => {
  //   return () => {
  //     localStorage.setItem("ApplicationUser",JSON.stringify({
  //       name: "",
  //       password: "",
  //       admin: false
  //     }));
  //   };
  // }, []);

  useEffect(() => {

    if (loggedUser.length!==0) {
    if (loggedUser[0].name === formData.name && loggedUser[0].password=== formData.password) {
      localStorage.clear();
      console.log("logged" + JSON.stringify(loggedUser[0]));
      localStorage.setItem("ApplicationUser",JSON.stringify(loggedUser[0]));
      console.log("stored "+ localStorage.getItem("ApplicationUser"))
      Router.push("/homepage");
    }}
  }, [loggedUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
setFormData({ name: data.get("email"), password: data.get("password") });
    login({ name: data.get("email"), password: data.get("password") }).then(
      (data) => {
        console.log("the data "+data)
        setLoggedUser(data);
        localStorage.setItem("ApplicationUser",JSON.stringify(loggedUser[0]));
        setRetry(true);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
          {retry?<h3 style={{color:'red'}}>Please Retry Incorrect Details</h3>:null}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            {/* <FormControlLabel
              control={<Checkbox name="admin" value="remember" color="primary" />}
              label="Login as Admin"
            /> */}
            {/*<input name="admin" type="checkbox" value="true" />*/}
            {/*<label>Login as Admin</label>*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/*<Grid item xs>*/}
              {/*  <Link href="#" variant="body2">*/}
              {/*    Forgot password?*/}
              {/*  </Link>*/}
              {/*</Grid>*/}
              <Grid item>
                <Link href="/create" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
