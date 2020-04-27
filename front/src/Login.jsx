import React, { useState } from "react";
import "bulma/css/bulma.css";
import Navbar from "./Components/Navbar";
const axios = require("axios");

function Login(props) {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");

  function handleInputChangeEmail(e) {
    let inputEmail = e.target.value;
    setEmail(inputEmail);
  }

  function handleInputChangePassword(e) {
    let inputPassword = e.target.value;
    setPassword(inputPassword);
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({email,password}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          props.history.push("/admin");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  }

  return (
    <div>
      <Navbar />
      <h1 class="has-text-centered has-text-weight-bold is-family-primary">
        Login
      </h1>
      <p></p>
      <br />
      <form onSubmit={onSubmit}>
        <input
          class="input is-primary input is-hovered"
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleInputChangeEmail}
          required
        />
        <br />
        <br/>
        <input
          class="input is-primary input is-hovered"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChangePassword}
          required
        />
        <br/>
        <br/>
        <button class="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
