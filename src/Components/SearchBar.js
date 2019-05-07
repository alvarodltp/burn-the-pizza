import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
});

class SearchBar extends React.Component {
  state = {
    search: "",
    resultsArr: null,
    itemNames: null,
    itemClicked: null
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  getSearchOptions = (e) => {
    let search = e.target.value.toLowerCase()
    fetch(`https://api.nutritionix.com/v1_1/search/${e.target.value.toLowerCase()}?results=0%3A20&cal_min=50&cal_max=100&fields=item_name%2Cbrand_name%2Cnf_serving_size_unit%2Cnf_total_carbohydrate%2Cnf_sugars%2Cimages_front_full_url%2Cnf_serving_size_qty%2Cnf_protein%2Cnf_calories%2Cnf_total_fat%2Citem_id%2Cbrand_id&appId=a8f79d5d&appKey=ad063534d80beb7b73e61da6a526265b`)
    .then(response => response.json())
    .then(json => {
      let results = json["hits"].map(result => result.fields)
      let itemNames = results.map(item => item.item_name)
      this.setState({
        resultsArr: results,
        search: search,
        itemNames: itemNames
      })
    })
  }

  getItem = (result) => {
    this.setState({
      itemClicked: result,
      resultsArr: null
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Burn The Pizza
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Food…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={this.getSearchOptions}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <List className={classes.root}>
          {this.state.resultsArr ? this.state.resultsArr.map(result =>
            <ListItem>
              <ListItemText onClick={() => this.getItem(result)} primary={`${result.item_name} - ${result.brand_name}`} secondary={`${result.nf_serving_size_qty} ${result.nf_serving_size_unit} - ${result.nf_calories} Calories`} />
            </ListItem> ) : null }
          </List>
        </div>
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
