import React from 'react'
import { AppBar, Toolbar, Typography, Button/*, IconButton */ } from 'material-ui'
import { withStyles } from 'material-ui/styles';
// import MenuIcon from 'material-ui-icons/Menu'
import { connect } from 'react-redux'
import { logout } from '../../actions/org'

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
    history.push('/')
  }
  const logInClick = () => {
    history.push('/loginchoice');
  }
  const loggedIn = localStorage.getItem('token')
  
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex} variant="headline" component='h2' onClick={() => {history.push('/')}}>
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

const component = connect(
  null,
  { logout }
)(Header)
export default withStyles(styles)(component);