import React from 'react';
import { Button, Icon, Card, Image } from 'semantic-ui-react'

function GuiltLevelMessage(props) {
  return(
    <Card style={{width: "30%", margin: "0 auto", marginBottom: "40px"}}>
      <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.guiltLevel["name"]}</Card.Header>
        <Card.Description>
          {props.guiltLevel["description"]}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button style={{background: "orange", color: "white", width: "100%"}} onClick={props.displayDropdown}>
          Burn Calories Now 💪
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
