import React from 'react';
import { Statistic, Image } from 'semantic-ui-react'

const FoodCalculationResults = (props) => {
  return(
    <React.Fragment>
      <h1 style={{fontSize:"50px", marginBottom: "30px"}}>{props.guiltLevel["name"].toUpperCase()}</h1>
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
