import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../../actions/org'
import { validateEmail, validatePhone } from '../../../helpers/validationHelper'
import routes from '../../../helpers/routes'

import { withStyles } from 'material-ui/styles';
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
      orgName: '',
      password: '',
      email: '',
      confirmPassword: '',
      phone: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = () => {
    const { signup } = this.props
    const { email, password, orgName, phone } = this.state;
    signup(email, password, orgName, phone, this.onSubmitComplete)
  }

  onSubmitComplete = () => {
    const { history } = this.props
    history.push(routes.educatorLogo)
  }
  
  
  emailValidate = () => {
    const { validateEmail } = this.props
    const { email } = this.state;
    validateEmail('org',email)
  }
  
  phoneValidate = () => {
    const { validatePhone } = this.props
    const { phone } = this.state;
    validatePhone('org',phone)
  }

  render(){
    const { classes, loginStatus } = this.props
    const passMatch = this.state.password === this.state.confirmPassword;
    return (
      <div className={classes.root}>
        <TextField
          required
          value={this.state.orgName}
          label="Organization Name"
          className={classes.block}
          onChange={this.handleChange('orgName')}
        />
        <TextField
          required
          value={this.state.email}
          label="Email"
          type="email"
          className={classes.block}
          onChange={this.handleChange('email')}
          onBlur={this.emailValidate}
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
          value={this.state.phone}
          label="Phone Number"
          type="phone"
          onBlur={this.phoneValidate}
          className={classes.block}
          onChange={this.handleChange('phone')}
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

const Comp = withStyles(styles)(SignUp)

const matchState = (state) => ({
  loginStatus: state.loginStatus
})

export default connect(
  matchState,
  { validateEmail, validatePhone, signup }
)(Comp)
