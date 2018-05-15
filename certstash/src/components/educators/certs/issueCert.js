import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddUser from './addUser'
import UserTable from './userTable'
import CSVModal from './CSVModal'
import SuccessModal from './SuccessModal'
import RejectedUsers from './rejectedUsers'
import { issueCerts } from '../../../actions/certActions'
import routeStrings from '../../../helpers/routeStrings'

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
    margin: '15px 0 0 auto',
    display: 'inline'
  }
}

class IssueCert extends Component {
  state = {
    addingUser: false,
    csvModalOpen: false,
    successModalOpen: false
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.issuing === true && this.props.issuing === false){
      this.setState({successModalOpen: true})
    }
  }

  toggleAddUser = () => {
    this.setState( prev => ({addingUser: !prev.addingUser}))
  }

  // Add a user
  addedUser = () => {
    this.setState({addingUser: false})
  }

  // Issue Certs
  issueCertsClick = () => {
    const { users, course, issueCerts } = this.props;
    issueCerts(users, course)
  }

  // Modal controls
  toggleCSVModal = () => {
    this.setState(prev => ({csvModalOpen: !prev.csvModalOpen}))
  }
  closeSuccessModal = () => {
    this.setState({successModalOpen: false})
  }

  render(){
    const { classes, loadedUsers, users, course } = this.props
    const { addingUser, csvModalOpen, successModalOpen } = this.state

    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <div className={classes.topBar}>
            <Typography variant="headline" component="h2" align="left">
              Course: {course.name}
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
          { this.props.rejectedUsers.length > 0
            ? <div>
                <Typography variant="subheading" component="p" align="left">
                  The following students were not found in our system. Please check you records and make sure the information is correct. If it is, we will still issue the certification and invite the student join to CertStash.
                </Typography>
                <RejectedUsers />
              </div>
            : null
          }
          <Button variant="raised" className={ classes.issueButton } color={ "secondary" } onClick={this.inviteUsers} disabled={this.props.rejectedUsers.length === 0}>
            {this.props.issuing
              ? <CircularProgress className={ classes.progress } size={ 30 } color="inherit"/>
              : 'Invite and issue certs to all students'
            }
          </Button>
          <Button variant="raised" className={classes.issueButton} color={"primary"} onClick={this.issueCertsClick} disabled={users.length === 0 || course._id === undefined }>
            {this.props.issuing
              ? <CircularProgress className={classes.progress} size={30} color="inherit"/>
              : 'Issue Certs to Found Students Only'
            }
          </Button>
        </Paper>
        <CSVModal open={ csvModalOpen } closeCb={ this.toggleCSVModal }/>
        <SuccessModal 
          open={successModalOpen}
          closeSuccessModal={this.closeSuccessModal}
          navigateHome={ () => {this.props.history.push(routeStrings.educatorHome)} }
          navigateIssue={ () => {this.props.history.push(routeStrings.selectCourse)} }
         />
      </div>
    )
  }
}

const mapStateToProps = ({cert}) => {
  return {
    course: cert.course, 
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