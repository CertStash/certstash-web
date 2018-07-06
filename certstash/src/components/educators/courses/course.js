import React from 'react'

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'

import { loadCourse } from '../../../actions/certActions'
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer'
  },
  paper: {
    width: '90%',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '10px'
  }
}

const Course = (props) => {
  const { classes, course, navCallback,loadCourse } = props
  const clickHandler = () => {
    loadCourse(course)
    navCallback()
  }
  return (
    <div className={ classes.container } onClick={ clickHandler }>
      <Paper elevation={4} className={ classes.paper }>
        <Typography variant="headline" component="h2" align="left">
          { course.name }
        </Typography>
        <Typography component="p" align="left">
          Description: { course.description }
        </Typography>
        <Typography component="p" align="left">
          Valid for: { course.validDuration.label }
        </Typography>
      </Paper>
    </div>
  )
}
const component = connect(null, { loadCourse })(Course)
export default withStyles(styles)(component)