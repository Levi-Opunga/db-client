import * as React from "react";
import {useState, useEffect, Redirect} from "react";
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
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {create,editUser,oneUser} from "./api/client";
import Router from "next/router";
import {json} from "react-router-dom";


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
    const [updateUser, setupdateUser] = useState(JSON.parse(localStorage.getItem("updateUser")));
    const [userData, setuserData] = useState([
        {
            name: "",
            password: "",
        },
    ]);

    const [item, setItem] = useState({
        name: "",
        password: "",
        admin: false
    })

    //const [retry, setRetry] = useState(false);

    // useEffect(() => {
    //   //console.log(loggedUser);
    //   if (loggedUser.length!=0) {
    //   if (loggedUser[0].name == formData.name && loggedUser[0].password== formData.password) {
    //     localStorage.setItem("ApplicationUser",JSON.stringify(loggedUser[0]));
    //     Router.push("/homepage");
    //   }}
    // }, [loggedUser]);
    useEffect(() => {
        return () => {
          setupdateUser(JSON.parse(localStorage.getItem("updateUser")));
          console.log("iiiidd"+updateUser.id)
          oneUser(updateUser.id).then((data)=>setuserData(data));
          console.log(userData)
        };
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get("email"),
        //   password: data.get("password"),
        //   admin: data.get("admin") == "true" ? true : false,
        // });


        setuserData({name: data.get("email"), password: data.get("password"), admin: data.get("admin")});
        editUser({name: data.get("email"), password: data.get("password"), admin: data.get("admin")}).then(
            (data) => {
                console.log(data)
                Router.push("/homepage");
            }
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >

                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit user info
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            value={userData.name}
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
                            value={userData.password}
                            name="password"
                            label="Password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
              control={<Checkbox name="admin" value="remember" color="primary" />}
              label="Login as Admin"
            /> */}
                        <input name="admin" type="checkbox" value="true"/>
                            <label>Admin Privilege</label>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
Update User                        </Button>
                        {/*<Grid container>*/}
                        {/*  <Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*      Forgot password?*/}
                        {/*    </Link>*/}
                        {/*  </Grid>*/}
                        {/*  <Grid item>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*      {"Don't have an account? Sign Up"}*/}
                        {/*    </Link>*/}
                        {/*  </Grid>*/}
                        {/*</Grid>*/}
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}
