import React from 'react'
import {Input, Button} from 'semantic-ui-react'

class SignUp extends React.Component {
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

saveUser = (e) => {
  e.preventDefault();
    let userData = {user: {
      username: this.state.username,
      cheater_level: "",
      password: this.state.password
    }}
    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(this.props.updateUser)
    // this.props.history.push('/profile')
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

export default SignUp
