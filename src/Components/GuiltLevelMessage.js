import React from 'react';
import { Button, Icon, Card, Image, Input } from 'semantic-ui-react'
import ExerciseDropdown from './ExerciseDropdown'

function GuiltLevelMessage(props) {
  return(
    <Card style={{width: "80%", margin: "0 auto", marginBottom: "30px", background: "transparent", borderRadius: "0px", boxShadow: "none"}}>
      <Card.Content>
        <Card.Header>{props.guiltLevel["description"]}</Card.Header>
      </Card.Content>
      <Card.Content style={{boxShadow: "none", borderRadius: "0px"}} extra>
        <Button onClick={props.displayExerciseDropdown} style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}}>
          Burn Calories Now 💪
        </Button>
        {props.exerciseDropdown === true ?
        <ExerciseDropdown handleChange={props.handleChange} handleDropdownClick={props.handleDropdownClick}/> : null }
        <Button style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}} onClick={props.clearGuiltLevel}>
          Add More Items
        </Button>
        {props.guiltLevel["name"] === "Reckless Cheater" ?
        <Button style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}}>
          Order Pizza 🍕
        </Button> : null}
      </Card.Content>
    </Card>
  )
}

export default GuiltLevelMessage;
