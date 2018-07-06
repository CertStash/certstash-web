import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Button, AppBar, Typography, Paper, TextField, MenuItem } from '@material-ui/core'

import { createCourse, updateCourse, deleteCourse } from '../../../actions/certActions'
import routes from '../../../helpers/routes'

const styles = {
  root: {
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
    amount: 100,
    type: 'y'
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

  static getDerivedStateFromProps(props){
    const { course } = props
    if(course && !!course.name){
      return {name: course.name, description: course.description, validDuration: course.validDuration.value}
    } 
    return {}
  } 

  handleChange = (name) => {
    return (e) => {
      this.setState({[name]: e.target.value})
    }
  }
  s
  createCourseObject = () => {
    const { name, description, validDuration } = this.state
    let duration = durations.filter( item => item.value === validDuration)[0]
    const course = {
      name,
      description,
      validDuration: duration
    }
    return course
  }

  createCourseClick = () => {
    const { history, createCourse } = this.props
    const course = this.createCourseObject();
    createCourse(course, history)
  }

  updateCourseClick = () => {
    const { updateCourse, course, history } = this.props
    const updatedCourse = this.createCourseObject()
    updateCourse(updatedCourse, course._id, () => {history.push(routes.educatorHome)})
  }

  deleteCourseClick = () => {
    // Create Delete confirmation modal
    const { deleteCourse, course, history } = this.props
    deleteCourse(course, () => {history.push(routes.educatorHome)})
  }

  render(){
    const { classes, title, course } = this.props
    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <AppBar position="static">
            <Typography className={classes.appBar} variant="title" color="inherit">
              {title}
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
          { course.name 
            ? <div> 
                <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.updateCourseClick}>
                  Update Course
                </Button>
                <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.deleteCourseClick}>
                  Delete Course
                </Button>
              </div>
            :<Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createCourseClick}>
              Create Course
            </Button>
          }
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => ({course: state.cert.course})
const component = connect(
  mapStateToProps,
  { createCourse, updateCourse, deleteCourse }
)(CourseWizard)
export default withStyles(styles)(component)