import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PhonelinkEraseIcon from '@material-ui/icons/PhonelinkErase';
import EuroIcon from '@material-ui/icons/Euro';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Badge from '@material-ui/core/Badge';
import StarsIcon from '@material-ui/icons/Stars';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);


const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 128,
    width: 128,
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIconLeft: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  statsIconRight: {
    color: theme.palette.icon,
    marginLeft: theme.spacing(1)
  },
  statsIcon: {
    color: theme.palette.icon,
  },
  bolder: {
    fontWeight:'bolder'
  }
}));

const ProductCard = props => {
  const { className, product, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
        
          <Grid
            className={classes.statsItem}
            item
          >
              {product.highlight &&<StarsIcon color="secondary"/>}
          </Grid>
          
          <Grid
            className={classes.statsItem}
            item
          >
            <IconButton className="no-padding">
              <HighlightOffIcon className={"delete-item"} />
            </IconButton>
          </Grid>
        </Grid>
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src={"/images/phone/"+product.image[0]}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {product.DeviceName}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >

        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            {product.stock ? <PhoneIphoneIcon fontSize="small" className={classes.statsIconLeft} /> : <PhonelinkEraseIcon fontSize="small" className={classes.statsIconLeft} />}
            <Typography
              display="inline"
              variant="body2"
              className={classes.bolder}
            >
              {product.stock}
            </Typography>
          </Grid>
          {product.sale > 0 ? <Grid
            className={classes.statsItem}
            item
          >
            <StyledBadge badgeContent={product.sale} color="secondary">
              <LocalOfferIcon fontSize="small" className={classes.statsIcon}/>
            </StyledBadge>
          </Grid> : ""}
          <Grid
            className={classes.statsItem}
            item
          >
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
  product: PropTypes.object.isRequired
};

export default ProductCard;
