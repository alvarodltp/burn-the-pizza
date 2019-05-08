import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class FoodList extends React.Component {
  state = {
    dense: false,
    secondary: false
  };

  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Foods Added
            </Typography>
            <div className={classes.demo}>
              {this.props.arrOfItems.map(item =>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary={`${item.item_name} - ${item.brand_name}`}
                    secondary={`${item.nf_serving_size_qty} ${item.nf_serving_size_unit} - ${item.nf_calories} Cal | ${item.nf_total_carbohydrate} Carb | ${item.nf_total_fat} Fat | ${item.nf_protein} Protein`}
                  />
                  <div onClick={() => {this.props.removeItem(item)}}>
                  <i className="material-icons" >
                    delete_outline
                  </i>
                  </div>
                </ListItem>
              </List>)}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FoodList);
