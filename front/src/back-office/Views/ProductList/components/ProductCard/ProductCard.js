import React, {useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import PhonelinkEraseIcon from "@material-ui/icons/PhonelinkErase";
import EuroIcon from "@material-ui/icons/Euro";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Badge from "@material-ui/core/Badge";
import StarsIcon from "@material-ui/icons/Stars";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    height: 128,
    width: 128,
    margin: "0 auto",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIconLeft: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
  statsIconRight: {
    color: theme.palette.icon,
    marginLeft: theme.spacing(1),
  },
  statsIcon: {
    color: theme.palette.icon,
  },
  bolder: {
    fontWeight: "bolder",
  },
  popover: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    border: "1px solid #e5e5e5"
  },
  button: {
    marginLeft:theme.spacing(1)
  }
}));

const ProductCard = (props) => {
  const { className, product, ...rest } = props;
  const id = product._id;
  const [deleted, setDeleted] = useState({ isDeleted: false, msg: {} });
  const classes = useStyles();

  const [anchorDelete, setAnchorDelete] = useState(null);

  const popoverClick = (event) => {
    setAnchorDelete(event.currentTarget);
  };

  const popoverClose = () => {
    setAnchorDelete(null);
  };

  const open = Boolean(anchorDelete);
  const popoverId = open ? 'simple-popover' : undefined;


  const deleteThisProduct = () => {
    axios.delete(process.env.REACT_APP_BACKEND_URL + "/admin/products/delete/" + id)
      .then(response => setDeleted({ isDeleted: true, msg: response.data }))
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {deleted.isDeleted && (
        <Redirect
          to={{
            pathname: "/admin/products/",
            msg: deleted.msg,
          }}
        />
      )}
      <CardContent>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            {product.highlight && <StarsIcon color="secondary" />}
          </Grid>

          <Grid className={classes.statsItem} item>
            <IconButton
              href={`/admin/products/edit/${product._id}`}
              className={`${classes.statsIconLeft} no-padding`}
            >
              <EditIcon className={"edit-item"} />
            </IconButton>
            <IconButton
              aria-describedby={popoverId}
              className="no-padding"
              onClick={popoverClick}
            >
              <HighlightOffIcon className={"delete-item"} />
            </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorDelete}
        onClose={popoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          <Grid className={classes.popover} align="center" variant="h4">Delete this product ? 
            <Button variant="contained" size="small" color="primary" className={classes.button} onClick={deleteThisProduct}> Confirm</Button>
            <Button variant="contained" size="small" color="default" className={classes.button} onClick={popoverClose}> Cancel</Button>
          </Grid>
      </Popover>
          </Grid>
        </Grid>
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src={
              process.env.REACT_APP_BACKEND_URL +
              "/images/phone/" +
              product.image[0]
            }
          />
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {product.DeviceName}
        </Typography>
        <Typography align="center" variant="body1"></Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            {product.stock ? (
              <PhoneIphoneIcon
                fontSize="small"
                className={classes.statsIconLeft}
              />
            ) : (
              <PhonelinkEraseIcon
                fontSize="small"
                className={classes.statsIconLeft}
              />
            )}
            <Typography
              display="inline"
              variant="body2"
              className={classes.bolder}
            >
              {product.stock}
            </Typography>
          </Grid>
          {product.sale > 0 ? (
            <Grid className={classes.statsItem} item>
              <StyledBadge badgeContent={product.sale} color="secondary">
                <LocalOfferIcon
                  fontSize="small"
                  className={classes.statsIcon}
                />
              </StyledBadge>
            </Grid>
          ) : (
            ""
          )}
          <Grid className={classes.statsItem} item>
            <Typography
              fontWeight="fontWeightBold"
              display="inline"
              variant="body2"
              className={classes.bolder}
            >
              {product.pricePhone}
            </Typography>
            <EuroIcon fontSize="small" className={classes.statsIconRight} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
