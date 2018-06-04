import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Paper } from 'material-ui'
import { getCourses } from '../../actions/certActions'
import routes from '../../helpers/routes'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
  },
  paper: {
    width: 450,
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loadButton: {
    margin: '10px'
  }
}

class EducatorHome extends Component {
  createCourseClick = () => {
    const { history, match } = this.props
    history.push(routes.createCourse)
  }

  getCourseClick = () => {
    this.props.getCourses( () => { this.props.history.push(routes.manageCourses) })
  }
  
  issueCertClick = () => {
    this.props.getCourses(() => { this.props.history.push(routes.selectCourse) })
  }

  manageCertsClick = () => {
    this.props.getCourses(() => { this.props.history.push(routes.manageCerts) })
  }

  render(){
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="headline" component="h2" align="center">
            Welcome to CertStash!
          </Typography>
          {this.props.org.courses.length === 0 
            ? <Typography component="p" align="center">
                It looks like you haven't created any courses yet, let's get started!
              </Typography>
            : null
          }
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createCourseClick}>
            Create New Course
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.getCourseClick}>
            Manage Course(s)
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.issueCertClick}>
            Issue New Certification(s)
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.manageCertsClick}>
            Manage Certification(s)
          </Button>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => ({org: state.org, course: state.cert.course})
const component = connect(
  mapStateToProps,
  { getCourses }
)(EducatorHome)
export default withStyles(styles)(component)