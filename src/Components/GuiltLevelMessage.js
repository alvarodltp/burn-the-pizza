import React from 'react';
import { Button, Icon, Card, Image, Input, Modal, Header } from 'semantic-ui-react'
import ExerciseDropdown from './ExerciseDropdown'

function GuiltLevelMessage(props) {
  return(
    <Card style={{width: "80%", margin: "0 auto", marginBottom: "30px", background: "transparent", borderRadius: "0px", boxShadow: "none"}}>
      <Card.Content>
        <Card.Header style={{textAlign: "left"}}>{props.guiltLevel["description"]}</Card.Header>
      </Card.Content>
      <Card.Content style={{boxShadow: "none", borderRadius: "0px"}} extra>

      {props.guiltLevel["name"] === "The Reckless Cheater" ?
      <Modal trigger={<Button onClick={props.setNewCheaterLevel}style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}}>Order Pizza 🍕</Button>}
        centered={true}>
        <Modal.Header>This is a confirmation you are a reckless cheater.</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://media.giphy.com/media/1iLEjvA5AIf53MVq/giphy.gif' />
          <Modal.Description>
            <p>Congratulations! Your level is now "The Out Of Control Cheater".</p>
          </Modal.Description>
        </Modal.Content>
      </Modal> : null }

        <Button onClick={props.displayExerciseDropdown} style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}}>
          Burn Calories Now 💪
        </Button>
        {props.exerciseDropdown === true ?
        <ExerciseDropdown calculateExerciseTime={props.calculateExerciseTime} handleChange={props.handleChange} handleDropdownClick={props.handleDropdownClick}/> : null }
        <Button style={{background: "orange", color: "white", width: "100%", marginBottom: "10px"}} onClick={() => {props.clearGuiltLevel(); props.showSearchBar(); props.hideDropdown()}}>
          Add More Items
        </Button>

      </Card.Content>
    </Card>
  )
}

export default GuiltLevelMessage;
