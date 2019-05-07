import React from 'react';
import '../App.css';
import SearchBar from './SearchBar'
import EnhancedTableHead from './EnhancedTableHead'

class App extends React.Component {
  constructor(){
    super()
    this.state={
      search: "",
      resultsArr: null,
      itemNames: null,
      itemClicked: null,
      arrOfItems: []
    }
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
    }, this.addItemToArr(result))
  }

  addItemToArr = (result) => {
    this.setState({
      arrOfItems: [...this.state.arrOfItems, result]
    })
  }

  render(){
    return (
      <div className="App">
        <SearchBar getSearchOptions={this.getSearchOptions} getItem={this.getItem} search={this.state.search} resultsArr={this.state.resultsArr} itemNames={this.state.itemNames}/>
        {this.state.arrOfItems.length > 0 ? <EnhancedTableHead arrOfItems={this.state.arrOfItems}/> : null }
      </div>
    );
  }
}

export default App;
