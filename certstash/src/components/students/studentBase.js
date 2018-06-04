import React from 'react'
import StudentLearnMore from './studentLearnMore'
import LoginSignup from '../loginSignup/loginSignup'
import StudentSignup from './loginSignup/signup'
import ImageUpload from '../loginSignup/ImageUpload'
import Login from './loginSignup/login'
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom'
import routes from '../../helpers/routes'

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
      <Route path={routes.studentLearnMore} component={StudentLearnMore}/>
      <Route path={routes.studentLogin} render={(props) => {
        return (
          <LoginSignup {...props}>
            <Login {...props} />
          </LoginSignup>
        )
      }} />
      <Route path={routes.studentSignup} render={(props) => {
        return (
          <LoginSignup {...props}>
            <StudentSignup {...props}/>
          </LoginSignup>
        )
      }} />
      <Route path={routes.studentPhoto} render={(props) => {
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