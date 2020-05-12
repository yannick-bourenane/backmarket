import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';

import {
  IconButton,
  Grid,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const OrderList = (props) => {
  const { className, ...rest } = props;

  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);
  // Fetch Database, refresh if new props msg (delete/add/edit...)
  useEffect(() => {
    axios
    .get(process.env.REACT_APP_BACKEND_URL + "/admin/orders/")
    .then((orders) => {
      setAllOrders(orders.data)
    });
  }, [props.location.msg]);
  // Initial settings of filtered orders = allOrders
  useEffect(() => {
    setFilteredOrders(allOrders)
  }, [allOrders])
    // When search is update : Filter, reset pagination, set filtered orders
    useEffect(() => {
    (async function () {
      let result = [...allOrders]
      result = await result.filter((p) =>
          p.DeviceName.toLowerCase().includes(search.toLowerCase())
      )
      await setPagination(1);
      await setFilteredOrders(result)
    })();
    
    }, [search])
  // Define what order to Display (20), when pagination or filtered Orders are updated
  useEffect(() => {
    setOrdersToShow(filteredOrders.filter((p, i) => i >= (pagination - 1) * 20 && i < pagination * 20));
  }, [filteredOrders, pagination])

  const handlePagination = nb => {
    setPagination(pagination+nb)
  }

  const classes = useStyles();
  return (
        <div className={classes.root}>
          <Grid container justify="space-between">
            <Autocomplete
              id="grouped-demo"
              options={filteredOrders.filter((p, i) => i < 20)}
              groupBy={(filteredOrders) => filteredOrders.Brand}
              getOptionLabel={(filteredOrders) => filteredOrders.DeviceName}
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
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
              <div className={classes.inner}>
                
            <Table>
              <TableHead>
                    <TableRow>
                      <TableCell>Buyer</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Products</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Date</TableCell>
                </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersToShow.length ?
                ordersToShow.map((order) => (
                  <TableRow item key={order._id} lg={4} md={6} xs={12}>
                    TODO
                  </TableRow>
                )) : <TableRow 
                    hover><TableCell colspan="5">{"No order yet."}</TableCell></TableRow>}
                  </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
          </div>
{/*       <div className={classes.pagination}>
            <Typography variant="caption">{ordersToShow.length * (pagination - 1) + 1}-{ordersToShow.length * (pagination)} of {filteredOrders.length && filteredOrders.length}</Typography>
            <IconButton>
              <ChevronLeftIcon onClick={pagination > 1 ? (() => handlePagination(-1)) : undefined} />
            </IconButton>
            <IconButton>
              <ChevronRightIcon onClick={pagination < (Math.floor(filteredOrders.length / 20)) ? (() => handlePagination(1)) : undefined} />
            </IconButton>
          </div> */}
        </div>
  );
}

export default OrderList
