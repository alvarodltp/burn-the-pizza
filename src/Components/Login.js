import React from 'react'
import {Input, Button} from 'semantic-ui-react'

class Login extends React.Component {
  constructor(){
    super()
    this.state={
      username: "",
      password: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render(){
    return(
      <div>
        <Input name="username" onChange={this.handleChange}/>
        <Input name="password" onChange={this.handleChange}/>
        <Button onClick={this.saveUser}>Submit</Button>
      </div>
    )
  }
}

export default Login
