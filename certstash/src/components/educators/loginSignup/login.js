import React, { Component } from 'react'
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {logIn} from '../../../actions/org.js'

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

class LogIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmitSuccess = () => {
    const { history } = this.props
    history.push('/educator/home')
  }

  onSubmit = () => {
    const { email, password } = this.state;
    const { logIn } = this.props
    logIn(email, password, this.onSubmitSuccess);
  }
  
  render(){
    const { classes, loginStatus } = this.props
    return (
      <div className={classes.root}>
        <TextField
          required
          value={this.state.email}
          label="Email"
          className={classes.block}
          onChange={this.handleChange('email')}
          error={loginStatus.wrongEmailPassword ? true : false}
        />
        <TextField
          required
          value={this.state.password}
          label="Password"
          type="password"
          error={loginStatus.wrongEmailPassword ? true : false}
          className={classes.block}
          onChange={this.handleChange('password')}
          helperText={loginStatus.wrongEmailPassword ? 'Incorrect Email or Password' : false}
        />
        <Button variant="raised" color="primary" className={classes.button} onClick={this.onSubmit}>
          Submit
        </Button>
      </div>
    )
  }
}
const matchState = (state) => ({loginStatus: state.loginStatus})
const component = connect( matchState, { logIn } )(LogIn)
export default withStyles(styles)(component)