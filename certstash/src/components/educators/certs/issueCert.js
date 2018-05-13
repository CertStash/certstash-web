import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddUser from './addUser'
import UserTable from './userTable'
import CSVModal from './CSVModal'
import RejectedUsers from './rejectedUsers'
import { issueCerts } from '../../../actions/certActions'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress';
import { Paper } from 'material-ui'


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
    addingUser: false,
    modalOpen: false
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
  toggleCSVModal = () => {
    this.setState(prev => ({modalOpen: !prev.modalOpen}))
  }
  render(){
    const { classes, loadedUsers, users, template } = this.props
    const { addingUser, modalOpen } = this.state

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
              <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.toggleCSVModal} >
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
            {this.props.issuing
              ? <CircularProgress className={classes.progress} size={30} color="inherit"/>
              : 'Issue Certs'
            }
          </Button>
          { this.props.rejectedUsers.length > 0
            ? <div>
                <Typography variant="headline" component="h2" align="left">
                  Users Not Found:
                </Typography>
                <RejectedUsers />
                <Button variant="raised" className={ classes.issueButton } color={ "secondary" } onClick={this.inviteUsers}>
                  {this.props.issuing
                    ? <CircularProgress className={ classes.progress } size={ 30 } color="inherit"/>
                    : 'Issue Certs Anyway and Invite Users'
                  }
                </Button>
              </div>
            : null
          }
        </Paper>
        <CSVModal open={ modalOpen } closeCb={ this.toggleCSVModal }/>
        {/* TODO: Create Success Modal */}
      </div>
    )
  }
}

const mapStateToProps = ({cert}) => {
  return {
    template: cert.template, 
    users: cert.users,
    rejectedUsers: cert.rejectedUsers,
    fetchingUsers: cert.fetchingUsers,
    loadedUsers: cert.loadedUsers,
    issuing: cert.issuing
  }
}
const component = connect(
  mapStateToProps,
  { issueCerts }
)(IssueCert)
export default withStyles(styles)(component)