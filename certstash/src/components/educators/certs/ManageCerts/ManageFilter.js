import React, { Component } from 'react'

import { connect } from 'react-redux'

import {  Button, FormControl, InputLabel, MenuItem, Select, withStyles, TextField } from '@material-ui/core'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DatePicker from "material-ui-pickers/DatePicker";
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

import { getCerts } from '../../../../actions/certActions'

const styles = {
  filterGroup: {
    margin: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  courseSelect: {
    width: '15%'
  },
  submitButton: {
    width: '10%'
  }
}

class ManageFilter extends Component {
  state = {
    course: '',
    startDate: new Date(2018, 5, 4),
    endDate: new Date(),
    email: ''
  }

  selectCourse = (e) => {
    this.setState({course: e.target.value})
  }

  submitFilter = () => {
    const { course, startDate, endDate, email } = this.state
    this.props.getCerts(course, startDate, endDate, email )
  }

  handleStartDateChange = date => {
    this.setState({startDate: date})
  }

  handleEndDateChange = date => {
    this.setState({endDate: date})
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value})
  }
  render() {
    const { classes, courses } = this.props
    return (
      <div className={classes.filterGroup}>
        <FormControl className={classes.courseSelect}>
          <InputLabel>Course</InputLabel>
          <Select value={this.state.course} onChange={this.selectCourse}>
            <MenuItem value="">All</MenuItem>
            {courses.map( course => {
              return <MenuItem value={course._id}>{course.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <div>
          Between: <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="pickers">
              <DatePicker format="MM/DD/YYYY" value={this.state.startDate} onChange={this.handleStartDateChange} />
            </div>
          </MuiPickersUtilsProvider>
          And: <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="pickers">
              <DatePicker format="MM/DD/YYYY" showTodayButton value={this.state.endDate} onChange={this.handleEndDateChange} />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <TextField 
          label="Student Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <Button variant="raised" className={classes.submitButton} color={"primary"} onClick={this.submitFilter} >
          Submit
        </Button>
      </div>
    )
  }
}
const mapStateToProps = state => ({courses: state.org.courses})
export default withStyles(styles)(connect(mapStateToProps, { getCerts })(ManageFilter))