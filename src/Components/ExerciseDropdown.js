import React from 'react';
import { Dropdown, Input, Select, Button } from 'semantic-ui-react'

let activityOptions = [
      {text: 'Bicycling - < 10, general leisure', value: 4.0 },
      {text: 'Bicycling - 10-11.9 mph, leasure, slow, light effort', value: 6.0 },
      {text: 'Bicycling - 12-13.9 mph, leasure, slow, moderate effort', value: 8.0 },
      {text: 'Bicycling - 14-15.9 mph, racing, fast, vigorous effort', value: 10.0},
      {text: 'Bicycling - 16-19 mph, racing/not drafting or > 19 mph drafting, very fast', value: 12.0 },
      {text: 'Bicycling -  > 20 mph, racing, not drafting', value: 16.0 },
      {text: 'Running - 5 mph(12 min mile)', value: 8.0 },
      {text: 'Running - 5.2 mph(11.5 min mile)', value: 9.0 },
      {text: 'Running - 6 mph(10 min mile)', value: 10.0 },
      {text: 'Running - 6.7 mph(9 min mile)', value: 11.0 },
      {text: 'Running - 7 mph(8.5 min mile)', value: 11.5 },
      {text: 'Running - 7.5 mph(8 min mile)', value: 12.5 },
      {text: 'Running - 8 mph(7.5 min mile)', value: 13.5 },
      {text: 'Stairmaster - Level 4', value: 7.0 },
      {text: 'Stairmaster - Level 6', value: 9.0 },
      {text: 'Stairmaster - Level 8', value: 11.0 },
      {text: 'Stairmaster - Level 10', value: 13.0 },

    ]

const ExerciseDropdown = (props) => {
  return(
    <React.Fragment>
      <Input style={{marginBottom: "10px"}} type='number' placeholder='Weight...' action>
        <input onChange={props.handleChange}/>
        <Select style={{width: "40%"}} onChange={(e, data) => {props.handleDropdownClick(e, data)}} options={activityOptions} placeholder='Exercise Type' />
        <Button type='submit'>Calculate</Button>
      </Input>
    </React.Fragment>
  )
}


export default ExerciseDropdown;
