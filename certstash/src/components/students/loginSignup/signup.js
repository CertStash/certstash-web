import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../../actions/user'
import { validateEmail, validatePhone } from '../../../helpers/validationHelper'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

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
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      email: '',
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
    const { email, password, firstName, lastName, phone } = this.state
    signup(email, password, firstName, lastName, phone, this.onSubmitComplete)
  }

  onSubmitComplete = () => {
    const { history } = this.props
    history.push('/student/photo')
  }
  
  emailValidate = () => {
    const { validateEmail } = this.props
    const { email } = this.state
    validateEmail('user',email)
  }

  phoneValidate = () => {
    const { validatePhone } = this.props
    const { phone } = this.state
    validatePhone('user',phone)
  }
  
  render(){
    const { classes, loginStatus } = this.props
    const passMatch = this.state.password === this.state.confirmPassword
    return (
      <div className={classes.root}>
        <TextField
          required
          value={this.state.firstName}
          label="First Name"
          className={classes.block}
          onChange={this.handleChange('firstName')}
        />
        <TextField
          required
          value={this.state.lastName}
          label="Last Name"
          className={classes.block}
          onChange={this.handleChange('lastName')}
        />
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
        <TextField
          required
          value={this.state.phone}
          label="Phone number"
          className={classes.block}
          onChange={this.handleChange('phone')}
          onBlur={ this.phoneValidate }
          error={loginStatus.phoneAlreadyInUse ? true : false}
          helperText={loginStatus.phoneAlreadyInUse ? 'Phone Number Already in Use' : ''}
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
  { validateEmail, validatePhone, signup }
)(SignUp)
export default withStyles(styles)(SignUpComponent)