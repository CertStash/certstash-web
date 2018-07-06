import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup, updateUser } from '../../../actions/user'
import { validatePhone, validateUsername } from '../../../helpers/validationHelper'
import routes from '../../../helpers/routes'

import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Typography } from '@material-ui/core'

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
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
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      description: '',
      location: '',
      occupation: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  onSubmit = () => {
    const { signup, updateUser } = this.props
    updateUser(this.state, this.onSubmitComplete)
  }

  onSubmitComplete = () => {
    const { history } = this.props
    history.push(routes.studentPhoto)
  }

  phoneValidate = () => {
    const { validatePhone } = this.props
    const { phone } = this.state
    validatePhone('user',phone)
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
        <Paper className={classes.paper}>
          <Typography component="h1" variant="headline">Great! Let's get a little bit more info about you and finish up your profile!</Typography>
          <TextField
            required
            value={this.state.username}
            label="Username"
            className={classes.block}
            onChange={this.handleChange('username')}
            onBlur={ this.phoneValidate }
            error={loginStatus.usernameAlreadyInUse ? true : false}
            helperText={loginStatus.phoneAlreadyInUse ? 'Username Already in Use' : ''}
          />
          <Typography component="h3" variant="subheading">This username will be the name you give out to anyone that wants to see your certifications.</Typography>
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
          <Typography component="h3" variant="subheading">The name you want to appear on your certifications.</Typography>
          <TextField
            value={this.state.description}
            label="Short Description of Yourself"
            className={classes.block}
            onChange={this.handleChange('description')}
          />
          <Typography component="h3" variant="subheading">This will apear on your profile, tell us a little about yourself!</Typography>
          <TextField
            value={this.state.location}
            label="Your Location"
            className={classes.block}
            onChange={this.handleChange('location')}
          />
          <TextField
            value={this.state.occupation}
            label="Your Occupation"
            className={classes.block}
            onChange={this.handleChange('occupation')}
          />
          <TextField
            value={this.state.phone}
            label="Phone Number"
            className={classes.block}
            onChange={this.handleChange('phone')}
            onBlur={ this.phoneValidate }
            error={loginStatus.phoneAlreadyInUse ? true : false}
            helperText={loginStatus.phoneAlreadyInUse ? 'Phone Number Already in Use' : ''}
          />
          <Typography component="h3" variant="subheading">This allows educators to find you by your phone number. We will never call or sell your number!</Typography>
          <Button variant="raised" disabled={!passMatch || loginStatus.phoneAlreadyInUse || loginStatus.emailAlreadyInUse} color="primary" className={classes.button} onClick={this.onSubmit}>
            Next
          </Button>
        </Paper>
      </div>
    )
  }
}
const matchState = (state) => ({loginStatus: state.loginStatus})
const SignUpComponent = connect(
  matchState,
  { validatePhone, validateUsername, signup, updateUser }
)(SignUp)
export default withStyles(styles)(SignUpComponent)