import React from 'react'
import StudentLearnMore from './studentLearnMore'
import LoginSignup from '../loginSignup/loginSignup'
import StudentSignup from './loginSignup/signup'
import ImageUpload from '../loginSignup/ImageUpload'
import Login from './loginSignup/login'
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom'

const styles = {
  root: {
    marginTop: '64',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  }
};
function StudentBase(props){
  const { classes, match } = props;
  return  (
    <div className={classes.root}>
      <Route path={`${match.url}/learnmore`} component={StudentLearnMore}/>
      <Route path={`${match.url}/login`} render={(props) => {
        return (
          <LoginSignup {...props}>
            <Login {...props} />
          </LoginSignup>
        )
      }} />
      <Route path={`${match.url}/signup`} render={(props) => {
        return (
          <LoginSignup {...props}>
            <StudentSignup {...props}/>
          </LoginSignup>
        )
      }} />
      <Route path={`${match.url}/photo`} render={(props) => {
        return (
          <LoginSignup {...props}>
            <ImageUpload type={'user'} {...props}/>
          </LoginSignup>
        )
      }} />
    </div>
  );
}

export default withStyles(styles)(StudentBase);