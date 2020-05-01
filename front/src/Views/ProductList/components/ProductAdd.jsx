import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
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
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(4) },
  spaceBottom: { marginBottom: theme.spacing(2) },
}));

const ProductAdd = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [values, setValues] = useState({ highlight: false });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const handleSubmit = () => {
    console.log("toto");
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Card {...rest} className={clsx(classes.root, className)}>
          <form autoComplete="off" noValidate>
            <CardHeader subheader="" title="Add a product" />
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
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    margin="dense"
                    name="pricePhone"
                    type="number"
                    defaultValue="0"
                    required
                    onChange={handleChange}
                    variant="outlined"
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
                    type="number"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputLabel className={classes.spaceBottom}>
                    Images
                  </InputLabel>
                  <DropzoneArea
                    acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                    maxFileSize={5000000}
                  />
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
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Switch
                    checked={values.highlight}
                    onChange={handleChange}
                    color="primary"
                    name="highlight"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Technology"
                    margin="dense"
                    name="technology"
                    onChange={handleChange}
                    variant="outlined"
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
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add the product
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

ProductAdd.propTypes = {
  className: PropTypes.string,
};

export default ProductAdd;
