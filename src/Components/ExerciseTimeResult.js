import React from 'react';
import { Message } from 'semantic-ui-react'

const ExerciseTimeResult = (props) => {
  return(
    <div style={{margin: "0 auto", marginBottom: "40px", width: "80%"}}>
      {props.totalExerciseTime < 60 ?
      <Message color='green'>To burn {props.totalCalories} calories, you need to do {props.totalExerciseTime} minutes of {props.selectedActivity["text"]}.</Message> :
      <Message color='green'>To burn {props.totalCalories} calories, you need to do {props.hoursAndMin} hours of {props.selectedActivity["text"]}.</Message> }
    </div>
  )
}

export default ExerciseTimeResult;
