import React, { Component } from 'react'

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography } from '@material-ui/core'

import Course from './course'
import routes from '../../../helpers/routes'
import { clearCourse } from '../../../actions/certActions'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    top: 200,
  },
  paper: {
    width: '75%',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loadButton: {
    margin: '10px auto',
    display: 'block'
  }
}

class Courses extends Component {
  
  createCourseClick = () => {
    const { history, match } = this.props
    history.push(routes.createCourse)
  }

  coursesClickHandler = () => {
    const { history, locString } = this.props
    history.push(locString)
  }

  componentDidMount = () => {
    const { clearCourse } = this.props
    clearCourse();
  }

  render(){
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="headline" component="h2" align="center">
            Select a Course:
          </Typography>
          {this.props.courses.length === 0 
            ? <div>
                <Typography component="p" align="center">
                  It looks like you haven't created any courses yet, let's get started!
                </Typography>
                <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createCourseClick}>
                  Create Course
                </Button>
              </div>
            : null
          }
          {this.props.courses.map( (item, index) => {
            return <Course key={index} course={ item } navCallback={ this.coursesClickHandler } />
          })}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({courses: state.org.courses})
const component = connect(
  mapStateToProps,
  { clearCourse }
)(Courses)
export default withStyles(styles)(component)