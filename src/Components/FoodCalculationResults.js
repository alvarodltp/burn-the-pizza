import React from 'react';
import { Statistic } from 'semantic-ui-react'

const FoodCalculationResults = ({calories, protein, fats, carbs, sugars}) => {
  return(
      <Statistic.Group style={{marginTop: "40px"}} color={'blue'}>
        <Statistic>
          <Statistic.Value>{calories}</Statistic.Value>
          <Statistic.Label>Calories</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{carbs}g</Statistic.Value>
          <Statistic.Label>Carbs</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{fats}g</Statistic.Value>
          <Statistic.Label>Fats</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{protein}g</Statistic.Value>
          <Statistic.Label>Protein</Statistic.Label>
        </Statistic>
      </Statistic.Group>
  )
}


export default FoodCalculationResults;
