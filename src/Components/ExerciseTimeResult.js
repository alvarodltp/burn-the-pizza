import React from 'react';
import { Dropdown, Input, Select, Button, Grid, Card } from 'semantic-ui-react'

const ExerciseTimeResult = (props) => {
  return(
    <React.Fragment>
      {props.totalExerciseTime < '60' ?
      <h1>Your need to do a total of {props.totalExerciseTime} minutes of {props.selectedActivity["name"]} so you can burn {props.totalCalories} calories.</h1> :
      <h1>Your need to do a total of {props.hoursAndMin} hours of {props.selectedActivity["name"]} so you can burn {props.totalCalories} calories.</h1> }
    </React.Fragment>
  )
}


export default ExerciseTimeResult;
