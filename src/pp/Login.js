import React from "react";
import {useState} from 'react'
import { Button, Input, InputLabel, InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import User from './User';
import CurrentUser from './CurrentUser';
import { useHistory } from "react-router-dom";
function Login() {
  const [user, setUser] = useState(new User());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();



  return (
    <div
      className="login"
      style={{
        height: "700px",
        width: "200px",
        position: "absolute",
        left: "50%",
        top: "70%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
      <Input
        className="mailF"
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        type="text"
          autofocus
          required
          value={email}
          onChange={(e) => {
            user.email = e.target.value;
            setEmail(e.target.value);
          }}
        style={{ marginBottom: "20px" }}
      />

      <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
      <Input
        className="passF"
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <VpnKeyIcon />
          </InputAdornment>
        }
        type="password"
          required
          value={password}
          onChange={(e) => {
            user.password = e.target.value;
            setPassword(e.target.value);
          }}
        style={{ marginBottom: "20px" }}
      />

      <Button
        className="lButton"
        variant="contained"
        color="primary"
        size="large"
        style={{
          fontSize: "2em",
          maxWidth: "200px",
          maxHeight: "70px",
          minWidth: "200px",
          minHeight: "70px",
          marginBottom: "20px"
        }}
        onClick={()=>{CurrentUser.handleLogIn(email, password).then(()=>{
          history.push("/interface");
        }).catch(err => {
          console.log(err.message);
        })}}
      >
        Login
      </Button>

      <Button
        className="SButton"
        variant="contained"
        color="primary"
        size="large"
        style={{
          fontSize: "2em",
          maxWidth: "200px",
          maxHeight: "70px",
          minWidth: "200px",
          minHeight: "70px",

        }}
        onClick={()=>{

          user.handleSignUp().then(()=>{CurrentUser.handleLogIn(email, password).then(()=>{
            history.push("/interface");
          }).catch(err => {
            console.log(err.message);
          })}). catch(err => {
            console.log(err.message);
          })
        
        }}
      >
        {" "}
        Sign Up{" "}
      </Button>

    </div>
  );
}

export default Login;