import React, { useState } from "react";
import Navbar from "./Components/Navbar";
const axios = require("axios");

function Register() {
  const [email, SetEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [warningPassword, setWarningPassword] = useState("");
  const [warningEmail, setWarningEmail] = useState("");

  function handleInputChangeEmail(e) {
    let inputEmail = e.target.value;
    if (inputEmail.length < 0) setWarningEmail("You need to add an email")
    SetEmail(inputEmail);
  }

  function handleInputChangePassword(e) {
    let inputPassword = e.target.value;
    if (inputPassword.length < 7) {
      setWarningPassword(
        "The password must be at least at least 8 characters long."
      );
    } else if (inputPassword.length < 0) {
      setWarningPassword("You need to add a password");
    }
    setPassword(inputPassword);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/api/createuser";
    axios
      .post(
        url,
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 className="has-text-centered has-text-weight-bold is-family-primary">
        Don't have an account yet ?
      </h1>
      <p>Register</p>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input is-primary input is-hovered"
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleInputChangeEmail}
          required
        />
        {warningEmail && <p>{warningEmail}</p>}
        <br />
        <br/>
        <input
          className="input is-primary input is-hovered"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChangePassword}
          required
        />
        <br/><br/>
        {warningPassword && <p>{warningPassword}</p>}
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
