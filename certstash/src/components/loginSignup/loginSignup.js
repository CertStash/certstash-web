import React, { Component } from 'react'
import { Paper } from 'material-ui'
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
  },
  paper: {
    width: 450
  }
};

class LoginSignup extends Component {
  constructor(props){
    super(props)
    const loc = props.location.pathname.split('/')[2]
    this.state = {
      value: loc === 'login' ? 0 : 1
    }
  }

  handleChange = (event, value) => {
    const { history, match } = this.props;
    const key = {
      0: 'login',
      1: 'signup'
    }
    history.push(`/${match.url.split('/')[1]}/${key[value]}`)
    this.setState({ value });
  };

  render(){
    const { classes } = this.props;
    const { value } = this.state
    return (
        <div className={classes.container}>
          <Paper elevation={4} className={classes.paper}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Log In" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {this.props.children}
          </Paper>
        </div>
    )
  }
}

export default withStyles(styles)(LoginSignup);