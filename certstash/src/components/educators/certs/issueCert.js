import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Paper } from 'material-ui'
import axios from 'axios'
import AddUser from './addUser'
import UserTable from './userTable'
import { issueCerts } from '../../../actions/certActions'

const styles = {
  container: {
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
  topBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonGroup: {
    display: 'flex'
  },
  loadButton: {
    marginLeft: 10,
    display: 'block'
  },
  issueButton: {
    margin: '15px 0 0 auto'
  }
}

class IssueCert extends Component {
  state = {
    addingUser: false
  }
  
  toggleAddUser = () => {
    this.setState( prev => ({addingUser: !prev.addingUser}))
  }

  addedUser = () => {
    this.setState({addingUser: false})
  }
  issueCertsClick = () => {
    const { users, template, issueCerts } = this.props;
    issueCerts(users, template)
  }
  render(){
    const { classes, loadedUsers, users, template } = this.props
    const { addingUser } = this.state
    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <div className={classes.topBar}>
            <Typography variant="headline" component="h2" align="left">
              Template: {template.name}
            </Typography>
            <div className={classes.buttonGroup}>
              <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.toggleAddUser} >
                { this.state.addingUser ? `▲ Search` : `▼ Search` }
              </Button>
              <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.addUser} disabled={false}>
                Import CSV
              </Button>  
            </div>
          </div>
          { addingUser
            ? <AddUser />
            : null }
          { loadedUsers && users.length === 0 
            ? (
              <Typography variant="headline" component="h2" align="center">
                No Users Found
              </Typography>
            )
            : null }
          <UserTable title={'Confirmed Users'} />
          <Button variant="raised" className={classes.issueButton} color={"primary"} onClick={this.issueCertsClick} disabled={users.length === 0 || template._id === undefined }>
            Issue Certs
          </Button>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    template: state.cert.template, 
    users: state.cert.users,
    fetchingUsers: state.cert.fetchingUsers,
    loadedUsers: state.cert.loadedUsers
  }
}
const component = connect(
  mapStateToProps,
  { issueCerts }
)(IssueCert)
export default withStyles(styles)(component)