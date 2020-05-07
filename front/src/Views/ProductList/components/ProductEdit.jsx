import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { DropzoneArea } from "material-ui-dropzone";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(4) },
  spaceBottom: { marginBottom: theme.spacing(2) },
  isBold: { fontWeight: "bolder" },
}));
const ProductEdit = (props) => {
  const { className, ...rest } = props;
  const id = props.match.params.id;
  const classes = useStyles();

  const [values, setValues] = useState({
    highlight: false,
    path: [],
  });
  const [showMore, setShowMore] = useState(false);
  const [msg, setMsg] = useState({ type: "", msg: "" });
  const [edited, setEdited] = useState({ isEdited: false, msg: {} });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/admin/products/" + id, {
        //withCredentials: true,
      })
      .then((product) => {
        setValues({ ...product.data, path:product.data.image.map(
          (img) => `${process.env.REACT_APP_BACKEND_URL}/images/phone/${img}`
        ) });
      })
      .catch((error) => {
        console.log(error.response.data)
      });
  }, []);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const handleSubmit = () => {
    let dataForm = new FormData();
    for (let key in values) {
      dataForm.append(key, values[key]);
    }
    if (values.image.length) {
      for (let i = 0; i < values.image.length; i++) {
        dataForm.append("file", values.image[i]);
      }
    }
    axios
      .patch(process.env.REACT_APP_BACKEND_URL + "/admin/products/" + id, dataForm)
      .then((response) => {
        setEdited({ isEdited: true, msg: response.data });
      })
      .catch((error) => {
        setMsg(error.response.data);
      });
  };
  const handleImages = (e) => {
    setValues({ ...values, image: e });
  };
  //debugger;
  return (
    <div className={classes.root}>
      {console.log(values)}
      {edited.isEdited && (
        <Redirect
          to={{
            pathname: "/admin/products/",
            msg: edited.msg,
          }}
        />
      )}
      <Grid container>
        <Card {...rest} className={clsx(classes.root, className)}>
          <form autoComplete="off" noValidate>
            <CardHeader
              subheader=""
              title={`Edit ${values.DeviceName ? values.DeviceName : ""}`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Device name"
                    margin="dense"
                    name="DeviceName"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    value={values.DeviceName ? values.DeviceName : ""}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Brand"
                    margin="dense"
                    name="Brand"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    value={values.Brand ? values.Brand : ""}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    margin="dense"
                    name="pricePhone"
                    type="number"
                    value="0"
                    required
                    onChange={handleChange}
                    variant="outlined"
                    value={values.pricePhone ? values.pricePhone : ""}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="stock"
                    margin="dense"
                    name="stock"
                    required
                    onChange={handleChange}
                    variant="outlined"
                    value={values.stock ? values.stock : ""}
                    type="number"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputLabel className={classes.spaceBottom}>
                    Images
                  </InputLabel>
                  {console.log(values)}
                  {values.path.length && 
                    <DropzoneArea
                      // key={increment} ++ to rerender
                      name="file"
                      onChange={handleImages}
                      acceptedFiles={["image/*"]}
                      maxFileSize={5000000}
                      initialFiles={values.path}
                      inputProps={{
                        name: "file",
                        className: "toto"
                      }}
                    />
                  }
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="sale"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    margin="dense"
                    name="sale"
                    type="number"
                    onChange={handleChange}
                    variant="outlined"
                    value={values.sale ? values.sale : ""}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.highlight}
                        onChange={handleChange}
                        name="highlight"
                        inputProps={{ "aria-label": "highlight checkbox" }}
                        color="primary"
                      />
                    }
                    label="Highlight"
                  />
                </Grid>
                <Grid
                  container
                  justify="center"
                  className={clsx(classes.root, className)}
                >
                  <FormControlLabel
                    control={
                      <Switch checked={showMore} onChange={handleShowMore} />
                    }
                    labelPlacement="top"
                    label={
                      <Typography variant="h4" color="primary">
                        Add technicals fields
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              <Fade in={showMore} mountOnEnter unmountOnExit>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Technology"
                      margin="dense"
                      name="technology"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.technology && values.technology}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Dimensions"
                      margin="dense"
                      name="dimensions"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.dimensions && values.dimensions}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Weight"
                      margin="dense"
                      name="weight"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.weight && values.weight}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="sim"
                      margin="dense"
                      name="sim"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.sim && values.sim}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="type"
                      margin="dense"
                      name="type"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.type && values.type}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="size"
                      margin="dense"
                      name="size"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.size && values.size}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="resolution"
                      margin="dense"
                      name="resolution"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.resolution && values.resolution}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="card_slot"
                      margin="dense"
                      name="card_slot"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.card_slot && values.card_slot}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="_3_5mm_jack_"
                      margin="dense"
                      name="_3_5mm_jack_"
                      onChange={handleChange}
                      variant="outlined"
                      value={values._3_5mm_jack_ && values._3_5mm_jack_}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="bluetooth"
                      margin="dense"
                      name="bluetooth"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.bluetooth && values.bluetooth}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="gps"
                      margin="dense"
                      name="gps"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.gps && values.gps}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="usb"
                      margin="dense"
                      name="usb"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.usb && values.usb}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="colors"
                      margin="dense"
                      name="colors"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.colors && values.colors}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="cpu"
                      margin="dense"
                      name="cpu"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.cpu && values.cpu}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="internal"
                      margin="dense"
                      name="internal"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.internal && values.internal}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="os"
                      margin="dense"
                      name="os"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.os && values.os}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="primary_"
                      margin="dense"
                      name="primary_"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.primary_ && values.primary_}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="secondary"
                      margin="dense"
                      name="secondary"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.secondary && values.secondary}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="features"
                      margin="dense"
                      name="features"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.features && values.features}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="nfc"
                      margin="dense"
                      name="nfc"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.nfc && values.nfc}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="camera"
                      margin="dense"
                      name="camera"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.camera && values.camera}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="battery_life"
                      margin="dense"
                      name="battery_life"
                      onChange={handleChange}
                      variant="outlined"
                      value={values.battery_life && values.battery_life}
                    />
                  </Grid>
                </Grid>
              </Fade>
            </CardContent>
            {msg.msg && (
              <Alert severity={msg.type && msg.type}>{msg.msg}</Alert>
            )}
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Edit the product
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

ProductEdit.propTypes = {
  className: PropTypes.string,
};

export default ProductEdit;
