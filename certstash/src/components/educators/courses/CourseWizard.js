import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import { Paper } from 'material-ui'
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

import { createCourse } from '../../../actions/certActions'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
  },
  paper: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  appBar: {
    paddingLeft: 10, 
    margin: 10
  },
  textInput: {
    width: '90%',
  },
  loadButton: {
    margin: '10px'
  },
  menu: {
    width: 200,
  }
}

const durations = [
  {
    value: 'ONE_DAY',
    label: '1 Day',
    amount: 1,
    type: 'd'
  },
  {
    value: 'ONE_WEEK',
    label: '1 Week',
    amount: 1,
    type: 'w'
  },
  {
    value: 'ONE_MONTH',
    label: '1 Month',
    amount: 1,
    type: 'M'
  },
  {
    value: 'THREE_MONTH',
    label: '3 Months',
    amount: 3,
    type: 'M'
  },
  {
    value: 'SIX_MONTH',
    label: '6 Months',
    amount: 6,
    type: 'M'
  },
  {
    value: 'YEAR',
    label: '1 Year',
    amount: 1,
    type: 'y'
  },
  {
    value: 'TWO_YEAR',
    label: '2 Years',
    amount: 2,
    type: 'y'
  },
  {
    value: 'THREE_YEAR',
    label: '3 Years',
    amount: 3,
    type: 'y'
  },
  {
    value: 'FIVE_YEAR',
    label: '5 Years',
    amount: 5,
    type: 'y'
  },
  {
    value: 'UNLIMITED',
    label: 'No Expiration',
    amount: 0,
    type: 'u'
  },
]

class CourseWizard extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      validDuration: 'YEAR'
    }
  }

  handleChange = (name) => {
    return (e) => {
      this.setState({[name]: e.target.value})
    }
  }

  createCourseClick = () => {
    const { history, createCourse } = this.props
    const { name, description, validDuration } = this.state
    let duration = durations.filter( item => item.value === validDuration)[0]
    const course = {
      name,
      description,
      validDuration: duration
    }
    createCourse(course, history)
  }

  render(){
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <AppBar position="static">
            <Typography className={classes.appBar} variant="title" color="inherit">
              Course Creation Wizard
            </Typography>
          </AppBar>
          <TextField
            id="name"
            label="Course Name"
            className={classes.textInput}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="description"
            label="Description"
            multiline
            className={classes.textInput}
            value={this.state.description}
            onChange={this.handleChange('description')}
            margin="normal"
          />
          <TextField
            id="select-duration"
            select
            className={classes.textField}
            value={this.state.validDuration}
            onChange={this.handleChange('validDuration')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Duration Cert Valid"
            margin="normal"
          >
            {durations.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createCourseClick}>
            Create Course
          </Button>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => ({org: state.org})
const component = connect(
  mapStateToProps,
  { createCourse }
)(CourseWizard)
export default withStyles(styles)(component)