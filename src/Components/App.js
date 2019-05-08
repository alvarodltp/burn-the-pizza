import React from 'react';
import '../App.css';
import SearchBar from './SearchBar'
import FoodList from './FoodList'

let counter = 1

class App extends React.Component {
  constructor(){
    super()
    this.state={
      search: "",
      resultsArr: null,
      itemClicked: null,
      arrOfItems: [],
      number: 1
    }
  }

  getSearchOptions = (e) => {
    let search = e.target.value.toLowerCase()
    fetch(`https://api.nutritionix.com/v1_1/search/${e.target.value.toLowerCase()}?results=0%3A5&cal_min=50&cal_max=100&fields=item_name%2Cbrand_name%2Cnf_serving_size_unit%2Cnf_total_carbohydrate%2Cnf_sugars%2Cimages_front_full_url%2Cnf_serving_size_qty%2Cnf_protein%2Cnf_calories%2Cnf_total_fat%2Citem_id%2Cbrand_id&appId=9167a26d&appKey=700f3e0e67379b6a1132274f90065f70`)
    .then(response => response.json())
    .then(json => {
      let results = json["hits"].map(result => result.fields)
      this.setState({
        resultsArr: results,
        search: search
      })
    })
  }

  addItemToArr = (result) => {
    //need to add an id to the result parameter right here before setting the state so it can have a unique key
    let addUniqueIdToObj = result["id"] = counter++
    console.log(result)
    this.setState({
      arrOfItems: [...this.state.arrOfItems, result],
      itemClicked: result,
      resultsArr: null
    })
  }

  removeItem = (itemToDelete) => {
    let arrOfItems = [...this.state.arrOfItems]
    let newArr = arrOfItems.filter(item => item.id !== itemToDelete.id)
    this.setState({
      arrOfItems: newArr
    })
  }


  render(){
    return (
      <div className="App">
        <SearchBar getSearchOptions={this.getSearchOptions} addItemToArr={this.addItemToArr} search={this.state.search} resultsArr={this.state.resultsArr} itemNames={this.state.itemNames}/>
        {this.state.arrOfItems.length > 0 ? <FoodList removeItem={this.removeItem} number={this.state.number} arrOfItems={this.state.arrOfItems}/> : null }
      </div>
    );
  }
}

export default App;
