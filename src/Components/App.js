import React from 'react';
import '../App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import SearchBar from './SearchBar'
import FoodList from './FoodList'
import GuiltLevelMessage from './GuiltLevelMessage'
import FoodCalculationResults from './FoodCalculationResults'
import SearchResults from './SearchResults'
import ExerciseDropdown from './ExerciseDropdown'
import { Button } from 'semantic-ui-react'
import LandingPage from './LandingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExerciseTimeResult from './ExerciseTimeResult';
import SignUp from './SignUp'
import Login from './Login'

let counter = 1

class App extends React.Component {
  constructor(){
    super()
    this.state={
      search: "",
      resultsArr: null,
      itemClicked: null,
      arrOfItems: [],
      number: 1,
      totalCalories: "",
      totalProtein: "",
      totalFats: "",
      totalCarbs: "",
      totalSugars: "",
      guiltLevel: "",
      color: "#f0f0f0",
      percentage: 0,
      hideFoodList: true,
      selectedActivity: "",
      userWeightKg: "",
      totalExerciseTime: "",
      weight: "",
      exerciseDropdown: false,
      imageUrl: "",
      showSearchBar: true,
      newLevel: "",
      hoursAndMin: ""
    }
  }

  componentDidMount(){
    toast.info("Start searching for foods on the top of the page!", {
        position: toast.POSITION.BOTTOM_LEFT
      })
  }

  setImage = () => {
    let imageUrl;
    if(this.state.guiltLevel["name"] === "The Responsible Cheater") {
      imageUrl = "https://media.giphy.com/media/PPW3wn2AyJssAy9Liz/giphy.gif"
    } else if(this.state.guiltLevel["name"] === "The Basic Cheater"){
      imageUrl = "https://media.giphy.com/media/GunMKKyfYutpe/giphy.gif"
    } else {
      imageUrl = "https://media.giphy.com/media/7FADMotTL2B4Q/giphy.gif"
    }
    this.setState({
      imageUrl: imageUrl
    })
  }

  getSearchOptions = (e) => {
    let search = e.target.value.toLowerCase()
    fetch(`https://api.nutritionix.com/v1_1/search/${e.target.value.toLowerCase()}?results=0%3A5&cal_min=50&cal_max=2000&fields=item_name%2Cbrand_name%2Cnf_serving_size_unit%2Cnf_total_carbohydrate%2Cnf_sugars%2Cimages_front_full_url%2Cnf_serving_size_qty%2Cnf_protein%2Cnf_calories%2Cnf_total_fat%2Citem_id%2Cbrand_id&appId=a8f79d5d&appKey=ad063534d80beb7b73e61da6a526265b`)
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
      resultsArr: null,
      search: ""
    })
  }

  removeItem = (itemToDelete) => {
    let arrOfItems = [...this.state.arrOfItems]
    let newArr = arrOfItems.filter(item => item.id !== itemToDelete.id)
    this.setState({
      arrOfItems: newArr
    })
  }

  calculateMacros = () => {
    let totalCalories;
    this.state.arrOfItems.length >= 1 ? totalCalories = Math.round(this.state.arrOfItems.map(item => item.nf_calories).reduce((a, b) => a + b).toFixed(2)) : totalCalories = 0
    let totalCarbs;
    this.state.arrOfItems.length >= 1 ? totalCarbs = Math.round(this.state.arrOfItems.map(item => item.nf_total_carbohydrate).reduce((a, b) => a + b).toFixed(2)) : totalCarbs = 0
    let totalFats;
    this.state.arrOfItems.length >= 1 ? totalFats = Math.round(this.state.arrOfItems.map(item => item.nf_total_fat).reduce((a, b) => a + b).toFixed(2)) : totalFats = 0
    // let totalSugars;
    // this.state.arrOfItems.length >= 1 ? totalSugars = this.state.arrOfItems.map(item => item.nf_sugars).reduce((a, b) => a + b).toFixed(2) : totalSugars = 0
    let totalProtein;
    this.state.arrOfItems.length >= 1 ? totalProtein = Math.round(this.state.arrOfItems.map(item => item.nf_protein).reduce((a, b) => a + b).toFixed(2)) : totalProtein = 0
    let guiltLevel;

    if(totalCalories <= 400){
      guiltLevel = {name:"The Responsible Cheater", percent:"50", description: "Responsible cheaters care about their nutrition but still like to have fun. You understand the balance between working hard for your goals and stuffing your face with bad foods once in a while."}
    } else if (totalCalories > 400 && totalCalories < 700){
      guiltLevel = {name:"The Basic Cheater", percent:"70", description: "Basic cheaters are as the word states; just basic. You didn't want to do too bad but you ended up falling for temptation and having more than what you should've."}
    } else {
      guiltLevel = {name:"The Reckless Cheater", percent:"100", description: "You are a Reckless Cheater. You might as well order some pizza."}
    }
    this.setState({
      totalCalories: totalCalories,
      totalFats: totalFats,
      totalCarbs: totalCarbs,
      totalProtein: totalProtein,
      guiltLevel: guiltLevel
    }, () => this.hideFoodList(), this.clearSearch())
  }

  clearSearch = () => {
    this.setState({
      search: ""
    })
  }

  hideFoodList = () => {
    this.setState({
      hideFoodList: !this.state.hideFoodList
    }, this.setImage())
  }

  handleDropdownClick = (e, data) => {
    if(this.state.weight <= 0 || this.state.weight === ""){
      this.setState({
        error: "Enter your weight to calculate."
      })
    } else {
      let userWeightKg = (this.state.weight / 2.2).toFixed(2)
      let activityName = e.target.innerText
      let filteredObj = data.options.filter(option => option.text === activityName)[0]
      this.setState({
        selectedActivity: filteredObj,
        userWeightKg: userWeightKg
      }, () => this.calculateExerciseTime(userWeightKg, filteredObj))
    }
  }

  calculateExerciseTime = (userWeightKg, filteredObj) => {
    // let userWeightKg = this.state.userWeightKg
    // let selectedActivity = this.state.selectedActivity
    let energyExpenditurePerMinute = (0.0175 * filteredObj.value * userWeightKg).toFixed(2)
    //divide total calories consumed by calories burned in a minute
    let totalExerciseTime = Math.round(this.state.totalCalories / energyExpenditurePerMinute)
    this.setState({
      totalExerciseTime: totalExerciseTime
    }, () => this.convertExerciseTimeToHours())
  }

  handleChange = (e) => {
    this.setState({
      weight: e.target.value
    })
  }

  clearGuiltLevel = () => {
    this.setState({
      guiltLevel: "",
      newLevel: "",
      totalExerciseTime: ""
    })
  }

  displayExerciseDropdown = () => {
    this.setState({
      exerciseDropdown: !this.state.exerciseDropdown
    })
  }

  hideDropdown = () => {
    this.setState({
      exerciseDropdown: false
    })
  }

  showSearchBar = () => {
    this.setState({
      showSearchBar: !this.state.showSearchBar
    })
  }

  setNewCheaterLevel = () => {
    this.setState({
      newLevel: "The Out Of Control Cheater"
    })
  }

  convertExerciseTimeToHours = () => {
    let minutes = this.state.totalExerciseTime
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;
    hours = hours < 10 ? '0' + hours : hours;
    min = min < 10 ? '0' + min : min;
    console.log(`${hours}:${min}`)
      this.setState({
        hoursAndMin: `${hours}:${min}`
      })
    }

  render(){
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="App">
            {this.state.search.length < 1 === true && this.state.arrOfItems.length === 0 ? <LandingPage hideFoodList={this.hideFoodList}/> : null}
            {this.state.showSearchBar === true ? <SearchBar getSearchOptions={this.getSearchOptions} addItemToArr={this.addItemToArr} search={this.state.search} resultsArr={this.state.resultsArr} itemNames={this.state.itemNames}/> : null } <br/>
            <ToastContainer />
            <SearchResults resultsArr={this.state.resultsArr} search={this.state.search} addItemToArr={this.addItemToArr} />
            {this.state.arrOfItems.length > 0 && this.state.guiltLevel === "" && this.state.search === "" ? <FoodList showSearchBar={this.showSearchBar} calculateMacros={this.calculateMacros} removeItem={this.removeItem} number={this.state.number} arrOfItems={this.state.arrOfItems}/> : null }
            {this.state.guiltLevel !== "" ? <FoodCalculationResults newLevel={this.state.newLevel} imageUrl={this.state.imageUrl} guiltLevel={this.state.guiltLevel} calories={this.state.totalCalories} protein={this.state.totalProtein} carbs={this.state.totalCarbs} fats={this.state.totalFats} sugars={this.state.totalSugars}/> : null }
            {this.state.totalExerciseTime != "" ? <ExerciseTimeResult totalExerciseTime={this.state.totalExerciseTime} selectedActivity={this.state.selectedActivity} totalCalories={this.state.totalCalories} hoursAndMin={this.state.hoursAndMin}/> : null }
            {this.state.totalCalories !== "" && this.state.guiltLevel !== ""? <GuiltLevelMessage setNewCheaterLevel={this.setNewCheaterLevel} hideDropdown={this.hideDropdown} showSearchBar={this.showSearchBar} calculateExerciseTime={this.calculateExerciseTime} handleChange={this.handleChange} handleDropdownClick={this.handleDropdownClick} exerciseDropdown={this.state.exerciseDropdown} displayExerciseDropdown={this.displayExerciseDropdown} clearGuiltLevel={this.clearGuiltLevel} guiltLevel={this.state.guiltLevel} percentage={this.state.percentage} color={this.state.color}/> : null }
            <Route exact path='/signup' render={props=> <SignUp {...props} />} />
            <Route exact path='/login' render={props=> <Login {...props} />} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
