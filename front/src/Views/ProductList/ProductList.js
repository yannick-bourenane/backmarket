import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { ProductsToolbar, ProductCard } from "./components";
import axios from "axios";
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/admin/products/")
      .then((products) => {
        setAllProducts(products.data)
      });
  }, [props.location.msg]);
  useEffect(() => {
    setProducts(allProducts.filter((product, i) => i < 20));
  }, [allProducts])
  

  function handleFilter() {
    let result = [...products]
    if (search) {
      result.filter((p) =>
      p.DeviceName.toLowerCase().includes(search.toLowerCase())
    );
    }
    return result
  }
  const handlePagination = nb => {
    return products.filter((p) => pagination)
  }
  const filtered = handleFilter();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Autocomplete
          id="grouped-demo"
          options={allProducts}
          groupBy={(allProducts) => allProducts.Brand}
          getOptionLabel={(allProducts) => allProducts.DeviceName}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              onSelect={(e) => setSearch(e.target.value)}
              label="Search by devices"
              variant="outlined"
            />
          )}
        />
        <Button
          variant="outlined"
          color="primary"
          href="/admin/products/add"
          startIcon={<AddIcon />}
        >
          Add a product
        </Button>
      </Grid>
      <div className={classes.content}>
        {props.location.msg && (
          <Grid>
            <Alert
              variant="filled"
              severity={props.location.msg.type && props.location.msg.type}
            >
              {props.location.msg.msg}
            </Alert>
          </Grid>
        )}
      </div>
      <div className={classes.content}>
        <Grid container spacing={3}>
          {filtered.length &&
            filtered.map((product) => (
              <Grid item key={product._id} lg={4} md={6} xs={12}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">{products.length*(pagination-1)+1}-{products.length*(pagination)} of {allProducts.length && allProducts.length}</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon onClick={() => handlePagination(1)} />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
