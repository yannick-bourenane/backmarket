import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
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
import Alert from "@material-ui/lab/Alert";
import Box from '@material-ui/core/Box';
const axios = require("axios");

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  deletetButton: {
    marginRight: theme.spacing(1)
  },
}));

const ModifyUser = props => {
  const { className, ...rest } = props;
  const [countries, setCountries] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});
  const [countryForm, setCountryForm] = useState("");
  const [deleted, setDeleted] = useState({ isDeleted: false, msg: {} });
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    zipcode:'',
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

  function handleCountry(e) {
    setCountryForm(e.target.value)
  }

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

useEffect(() => {
    axios.get(`/admin/user/${props.match.params.id}`)
        .then(res => {
            setValues(res.data)
        })
        .catch((err) => console.log(err))
}, [])

const handleSubmit = async (event) => {
  event.preventDefault();
  // const formData = new FormData();
  // formData.append('file',avatar);
  // const config = {
  //     headers: {
  //         'content-type': 'multipart/form-data'
  //     }
  // };
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + `/admin/user/${props.match.params.id}`,
        {           
          user: {
            email: values.email,
            password: values.password,
            firstname:values.firstname,
            lastname:values.lastname,
            address:values.address,
            zipcode:values.zipcode,
            city:values.city,
            country:countryForm,
          }
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });}

      const handleDelete = () => {
      axios
      .delete(process.env.REACT_APP_BACKEND_URL + `/admin/users/delete/${props.match.params.id}`)
      .then(response => setDeleted({ isDeleted: true, msg: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
    
      <form
        autoComplete="off"
        noValidate
      >
      <div className={classes.row}>
        <CardHeader
          subheader="Hey admin, you want to modify an user ?"
          title="Modify an user"
        />
       <span className={classes.spacer} />
        <Button
          className={classes.deleteButton}
          color="primary"
          variant="contained"
          onClick={handleDelete}
          size="small"
        >
          Delete User
        </Button>   
        </div> 
        <Grid>
        {deleted.msg.msg &&
        <Alert
              varia nt="filled"
              severity={deleted.isDelete}
            >
              {deleted.msg.msg}
            </Alert> }      
             </Grid> 
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
              <TextField
                fullWidth
                label="Select Country"
                margin="dense"
                name="state"
                onChange={handleCountry}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
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
          </Grid>
          <input type="file" name="file" onChange= {onChangeAvatar} />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Modify
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default ModifyUser;
