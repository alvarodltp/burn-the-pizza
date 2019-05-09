import React from 'react';
import { Button, Icon, Card, Image, Input } from 'semantic-ui-react'
import ExerciseDropdown from './ExerciseDropdown'

function GuiltLevelMessage(props) {
  return(
    <Card style={{width: "80%", margin: "0 auto", marginBottom: "40px"}}>
      <Card.Content>
        <Card.Header>{props.guiltLevel["name"]}</Card.Header>
        <Card.Description>
          {props.guiltLevel["description"]}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={props.displayExerciseDropdown} style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}}>
          Burn Calories Now 💪
        </Button>
        {props.exerciseDropdown === true ?
        <ExerciseDropdown handleChange={props.handleChange} handleDropdownClick={props.handleDropdownClick}/> : null }
        <Button style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}} onClick={props.clearGuiltLevel}>
          Add More Items
        </Button>
        {props.guiltLevel["name"] === "Reckless Cheater" ?
        <a>
          Order Pizza 🍕
        </a> : null}
      </Card.Content>
    </Card>
  )
}

export default GuiltLevelMessage;
