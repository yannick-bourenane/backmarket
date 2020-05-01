import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { ProductsToolbar, ProductCard } from "./components";
import axios from "axios";

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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/admin/products")
      .then((products) => {
        setProducts(products.data);
      });
  }, []);

  function handleFilter() {
    return products.filter((p) =>
      p.DeviceName.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filtered = handleFilter();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Autocomplete
          id="grouped-demo"
          options={products}
          groupBy={(products) => products.Brand}
          getOptionLabel={(products) => products.DeviceName}
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

      {/* {console.log(products)} */}
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
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
