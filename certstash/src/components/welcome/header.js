import React from 'react'
import { AppBar, Toolbar, Typography, Button/*, IconButton */ } from 'material-ui'
import { withStyles } from 'material-ui/styles';
// import MenuIcon from 'material-ui-icons/Menu'
import { connect } from 'react-redux'
import { logout } from '../../actions/org'
import routes from '../../helpers/routes'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
    cursor: 'pointer'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes, history, logout} = props;
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
          <Typography type="title" color="inherit" className={classes.flex} variant="headline" component='h2' onClick={() => {history.push(routes.home)}}>
            CertStash
          </Typography>
          {loggedIn
            ? <Button color="inherit" onClick={onSignOut}>Sign Out</Button>
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