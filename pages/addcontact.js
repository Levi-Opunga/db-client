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
import { createContacts } from "./api/client";
import Router from "next/router";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  ProSidebarProvider,
} from "react-pro-sidebar";

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

function Form() {
  const [loggedUser, setLoggedUser] = useState([
    {
      name: "",
      password: "",
    },
  ]);
  const [formData, setFormData] = useState([
    {
      name: "",
      password: "",
    },
  ]);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    //console.log(loggedUser);
    if (loggedUser.length !== 0) {
      if (
        loggedUser[0].name === formData.name &&
        loggedUser[0].password === formData.password
      ) {
        localStorage.setItem("ApplicationUser", JSON.stringify(loggedUser[0]));
        Router.push("/homepage");
      }
    }
  }, [loggedUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   admin: data.get("admin") == "true" ? true : false,
    // });
    let extra ={ firstName: data.get("firstName"), lastName: data.get("lastName"),email: data.get("email"),phone: data.get("phone"),mobile: data.get("mobile"),linkedIn: data.get("linkedIn"),website: data.get("website"),facebook: data.get("facebook")}

    //setFormData({ name: data.get("email"), password: data.get("password") });
    console.log(JSON.stringify(extra))
   createContacts(extra).then((res) => console.log(res));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {retry ? (
            <h3 style={{ color: "red" }}>Please Retry Incorrect Details</h3>
          ) : null}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Contact
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          > <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
          /> <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="mail"
              autoFocus
          /> <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Telephone Number"
              name="phone"
              autoFocus
          /> <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="email"
              autoFocus
          />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            /> <TextField
                margin="normal"
                required
                fullWidth
                id="website"
                label="Website Url"
                name="website"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="facebook"
                label="Facebook Handle"
                name="facebook"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="linkedIn"
                label="Linked In"
                name="linkedIn"
                autoFocus
            />

            {/* <FormControlLabel
              control={<Checkbox name="admin" value="remember" color="primary" />}
              label="Login as Admin"
            /> */}

            <Button
              type="submit"

              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save contact
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">

                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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

export function Layout({ children }) {
  const { collapseSidebar } = useProSidebar();

  return (
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar>
          <Menu>
            <Link href="/homepage">
              <MenuItem>Home</MenuItem>
            </Link>
            <Link href="/addcontact">
              <MenuItem>Add Contact</MenuItem>
            </Link>
            <Link href="/users">
              <MenuItem>Users</MenuItem>
            </Link>
            <Link href="/create">
              <MenuItem>Create User</MenuItem>
            </Link>
          </Menu>
        </Sidebar>
        <main className="text-center">
          {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
          {children}
        </main>
      </div>
  );
}

export default function AddContact(){
  return (
    <ProSidebarProvider>
      <Layout>
        <Form></Form>
      </Layout>
    </ProSidebarProvider>
  );
};
