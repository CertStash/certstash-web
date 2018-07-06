import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/core-icons/Menu'
import { connect } from 'react-redux'
import { logout } from '../../actions/org'
import routes from '../../helpers/routes'

import UserBanner from './UserBanner'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  title: {
    cursor: 'pointer',
    display: 'inline'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

const Header = props => {
  const { classes, history, logout, user, org} = props;
  const onSignOut = () => {
    logout();
    history.push(routes.home)
  }
  const logInClick = () => {
    history.push(routes.loginChoice);
  }
  const loggedIn = localStorage.getItem('token')
  
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <div className={classes.flex}>
            <Typography color="inherit" variant="headline" component='h1' className={classes.title} onClick={() => {history.push(routes.home)}}>
              CertStash
            </Typography>
          </div>
          {loggedIn
            ? <UserBanner name={ user.firstName ? `${user.firstName} ${user.lastName}` : org.orgName } imageUrl={ user.imageUrl || org.imageUrl } clickHandler={onSignOut}/>
            : <Button color="inherit" onClick={logInClick}>Log In</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    org: state.org,
    user: state.user
  }
}
const component = connect(
  mapStateToProps,
  { logout }
)(Header)
export default withStyles(styles)(component);