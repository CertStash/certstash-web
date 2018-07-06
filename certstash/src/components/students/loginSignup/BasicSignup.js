import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../../actions/user'
import { validateEmail, validatePhone, validateUsername } from '../../../helpers/validationHelper'
import routes from '../../../helpers/routes'

import { withStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 0 15px 0'
  },
  block: {
    width: '80%',
    margin: 5
  },
  button: {
    alignSelf: 'flex-end',
    margin: '10px 40px 0 0'
  }
}

class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  onSubmit = () => {
    const { signup } = this.props
    const { email, password } = this.state
    signup( email, password, this.onSubmitComplete)
  }

  onSubmitComplete = () => {
    const { history } = this.props
    // history.push(routes.studentPhoto)
    history.push(routes.studentSignupDetail)
  }
  
  emailValidate = () => {
    const { validateEmail } = this.props
    const { email } = this.state
    validateEmail('user',email)
  }
  
  usernameValidate = () => {
    const { validateUsername } = this.props
    const { username } = this.state
    validateUsername(username)
  }

  render(){
    const { classes, loginStatus } = this.props
    const passMatch = this.state.password === this.state.confirmPassword
    return (
      <div className={classes.root}>
        <TextField
          required
          value={this.state.email}
          label="Email"
          type="email"
          className={classes.block}
          onChange={this.handleChange('email')}
          onBlur={ this.emailValidate }
          error={loginStatus.emailAlreadyInUse ? true : false}
          helperText={loginStatus.emailAlreadyInUse ? 'Email Already in Use' : ''}
        />
        <TextField
          required
          value={this.state.password}
          label="Password"
          type="password"
          className={classes.block}
          onChange={this.handleChange('password')}
        />
        <TextField
          required
          error={!passMatch}
          value={this.state.confirmPassword}
          label="Confirm Password"
          type="password"
          helperText={passMatch ? null : "Error: Passwords Do Not Match"}
          className={classes.block}
          onChange={this.handleChange('confirmPassword')}
        />
        <Button variant="raised" disabled={!passMatch || loginStatus.phoneAlreadyInUse || loginStatus.emailAlreadyInUse} color="primary" className={classes.button} onClick={this.onSubmit}>
          Submit
        </Button>
      </div>
    )
  }
}
const matchState = (state) => ({loginStatus: state.loginStatus})
const SignUpComponent = connect(
  matchState,
  { validateEmail, signup }
)(SignUp)
export default withStyles(styles)(SignUpComponent)