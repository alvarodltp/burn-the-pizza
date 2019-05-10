import React from 'react';
import { Statistic, Image } from 'semantic-ui-react'

const FoodCalculationResults = (props) => {
  return(
    <React.Fragment>
    {props.newLevel !== "" ?
      <h1 style={{fontSize:"50px", marginBottom: "20px", color: "#2185d0"}}>{props.newLevel.toUpperCase()}</h1> :
      <h1 style={{fontSize:"50px", marginBottom: "20px", color: "#2185d0"}}>{props.guiltLevel["name"].toUpperCase()}</h1> }
      <p style={{margin: "0 auto", textAlign: "left", width: "80%", marginBottom: "30px"}}>{props.guiltLevel["description"]}</p>

      <Image style={{margin: "0 auto", height: "300px"}} src={props.imageUrl} />
      <Statistic.Group style={{marginTop: "40px"}} color={'blue'}>
        <Statistic>
          <Statistic.Value>{props.calories}</Statistic.Value>
          <Statistic.Label>Calories</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{props.carbs}g</Statistic.Value>
          <Statistic.Label>Carbs</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{props.fats}g</Statistic.Value>
          <Statistic.Label>Fats</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{props.protein}g</Statistic.Value>
          <Statistic.Label>Protein</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </React.Fragment>
  )
}


export default FoodCalculationResults;
