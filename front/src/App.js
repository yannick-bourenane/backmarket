import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { useDispatch } from "react-redux";
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import axios from 'axios';
import { fetchAllPhones } from 'actions';
import { fetchHigh } from 'actions';


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};


const App = () => {
  const dispatch = useDispatch();
     axios
       .get(process.env.REACT_APP_BACKEND_URL + "/products/")
       .then(products => dispatch(fetchAllPhones(products.data)))
       .catch(err => console.log(err.response.data))

      axios
      .get(process.env.REACT_APP_BACKEND_URL + "/products/highlight")
      .then(productsHighlight => dispatch(fetchHigh(productsHighlight.data)))
      .catch(err => console.log(err.response.data))

    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }

  export default App;


