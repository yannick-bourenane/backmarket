import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Navbar from "../back-office/components/Navbar";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
import { InputLabel } from '@material-ui/core';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
const axios = require("axios");

const useStyles = makeStyles(() => ({
  root: {}
}));

const Register = props => {
  const { className, ...rest } = props;
  const [countries, setCountries] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [msg, setMsg] = useState({ type: "", msg: "" });
  const [created, setCreated] = useState({ isCreated: false, msg: {} });
  //const [countryForm, setCountryForm] = useState("");
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    zipcode: '',
    country:'',
    city: '', 
    password:'',
  });
  const classes = useStyles();

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // function handleCountry(e) {
  //   setCountryForm(e.target.value)
  // }

function onChangeAvatar(e) {
  setAvatar(e.target.files[0])
}


useEffect(() => {
 axios.get('https://restcountries.eu/rest/v2/regionalbloc/eu')
  .then(function (response) {
    setCountries(response.data)  
  })
  .catch(function (error) {
    console.log(error);
  })
}, [])

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData();

  for (let key in values) {
    formData.append(key, values[key]);
  }
  formData.append('file',avatar);
  
console.log(formData)
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/createuser", formData,
        { withCredentials: true }
      )
      .then((response) => {
        setCreated({ isCreated: true, msg: response.data });
      })
      .catch((error) => {
        setMsg(error.response.data);
      });}


  return (
    <>
      {created.isCreated && (
      <Redirect
        to={{
          pathname: "/",
          msg: created.msg,
        }}
      />
      )}
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Don't have an account yet ? Register !"
          title="Register"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstname"
                onChange={handleChange}
                required
                value={values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastname"
                onChange={handleChange}
                required
                value={values.lastname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="dense"
                name="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Rue"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Zipcode"
                margin="dense"
                name="zipcode"
                onChange={handleChange}
                value={values.zipcode}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                margin="dense"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.country ? values.country : ""}
                variant="outlined"
              >
                  <option selected></option>
                {countries.length && countries.map((option,i) => (
                  <option
                    key={i}
                    value={option.name}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
          <InputLabel className={classes.spaceBottom}>
            Avatar
          </InputLabel>
          <TextField
          fullWidth
          type="file"
              margin="dense"
              name="file"
              onChange={onChangeAvatar}
              required
              variant="outlined"
            />
           </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {msg.msg && (
          <Alert severity={msg.type && msg.type}>{msg.msg}</Alert>
        )}
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </CardActions>
      </form>
      </Card>
      </>
  );
}

export default Register;
