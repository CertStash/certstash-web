import React, { Component } from 'react'

import { connect } from 'react-redux'

import { TextField, Button, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getUsers } from '../../../actions/certActions'

const styles = {
  userContainer: {
    marginTop: 15,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  title: {
    flexBasis: '100%'
  },
  input: {
    flexBasis: '30%'
  },
  loadButton: {

  }
}

class AddUser extends Component {
  state = {
    email: '',
    phone: '',
    byEmail: false,
    byPhone: false
  }
  handleChange = (name) => {
    return (e) => {
      this.setState({[name]: e.target.value})
    }
  }
  searchClick = () => {
    this.props.getUsers([this.state.email]);
    this.setState({email: '', phone: ''})
  }

  handleByButtonClick = (type) => {
    let other = type === 'byEmail' ? 'byPhone' : 'byEmail'
    return () => {
      this.setState({[type]: true, [other]: false})
    }
  }

  onKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.searchClick();
    }
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.userContainer}>
        { this.state.byEmail 
          ? <TextField
              value={this.state.email}
              label="Student Email"
              className={classes.input}
              onChange={this.handleChange('email')}
              onKeyPress={ this.onKeyPress }
            />
          : <Button variant="raised" className={classes.loadButton} color={"inherit"} onClick={ this.handleByButtonClick('byEmail') }>
              Search by Email
            </Button>       
        }
        { this.state.byPhone 
          ? <TextField
              value={this.state.phone}
              label="Student Phone Number"
              className={classes.input}
              onChange={this.handleChange('phone')}
              onKeyPress={ this.onKeyPress }
            />
          : <Button variant="raised" className={classes.loadButton} color={"inherit"} onClick={ this.handleByButtonClick('byPhone') }>
              Search by Phone
            </Button>       
        }
        
        <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={ this.searchClick } disabled={ this.state.email.length === 0 || this.state.phone === 0 }>
          {this.props.fetching
            ? <CircularProgress className={classes.progress} size={30} color="inherit"/>
            : 'Search for User'
          }
        </Button>
      </div>
    )
  }
}
const mapStateToProps = state => ({ fetching: state.cert.fetchingUsers })
const component = connect(mapStateToProps, { getUsers })(AddUser)
export default withStyles(styles)(component)