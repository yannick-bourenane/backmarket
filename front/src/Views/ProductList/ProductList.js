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

const ProductList = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
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
    setFilteredProducts(allProducts)
  }, [allProducts])
  
  useEffect(() => {
    (async function () {
      let result = [...allProducts]
      result = await result.filter((p) =>
          p.DeviceName.toLowerCase().includes(search.toLowerCase())
      )
      await setPagination(1);
      await setFilteredProducts(result)
    })();
    
  }, [search])
  useEffect(() => {
    setProductsToShow(filteredProducts.filter((p, i) => i >= (pagination - 1) * 20 && i < pagination * 20));
  }, [filteredProducts, pagination])

  // function handleFilter() {
  //   let result = [...allProducts]
  //   if (search) {
  //       // On search reset pagination
  //       result = result.filter((p) =>
  //       p.DeviceName.toLowerCase().includes(search.toLowerCase())
  //     );
      
  //   }
  //   result = result.filter((p, i) => i >= (pagination - 1) * 20 && i < pagination * 20);
  //   setFilteredProducts(result)
  // }
  const handlePagination = nb => {
    setPagination(pagination+nb)
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Autocomplete
          id="grouped-demo"
          options={filteredProducts.filter((p,i) => i < 20)}
          groupBy={(filteredProducts) => filteredProducts.Brand}
          getOptionLabel={(filteredProducts) => filteredProducts.DeviceName}
          style={{ width: 300 }}
          clearOnBlur={false}
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
          {productsToShow.length &&
            productsToShow.map((product) => (
              <Grid item key={product._id} lg={4} md={6} xs={12}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">{productsToShow.length*(pagination-1)+1}-{productsToShow.length*(pagination)} of {filteredProducts.length && filteredProducts.length}</Typography>
        <IconButton>
          <ChevronLeftIcon onClick={pagination > 1 ? (()=>handlePagination(-1)) : undefined}/>
        </IconButton>
        <IconButton>
          <ChevronRightIcon onClick={pagination < (Math.floor(filteredProducts.length/20)) ? (()=>handlePagination(1)) : undefined} />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
