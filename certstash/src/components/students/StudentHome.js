import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Button, Typography, Paper } from '@material-ui/core'
import { getUserCerts } from '../../actions/user'
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
  viewCertsClick = () => {
    this.props.getUserCerts()
    this.props.history.push(routes.studentViewCerts)
  }
  render(){
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="headline" component="h2" align="center">
            Welcome to CertStash {this.props.user.firstName}! 
          </Typography>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.viewCertsClick}>
            View/Manage Certs
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={() => {}}>
            Manage Profile
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={() => {}}>
            Search For Courses
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={() => {}}>
            Search For Educators
          </Button>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => ({user: state.user})
const component = connect(
  mapStateToProps,
  { getUserCerts }
)(EducatorHome)
export default withStyles(styles)(component)