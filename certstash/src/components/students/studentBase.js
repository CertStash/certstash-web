import React from 'react'
import StudentLearnMore from './StudentLearnMore'
import LoginSignup from '../loginSignup/LoginSignup'
import BasicSignup from './loginSignup/BasicSignup'
import DetailSignup from './loginSignup/DetailSignup'
import StudentHome from './StudentHome'
import ImageUpload from '../loginSignup/ImageUpload'
import Login from './loginSignup/Login'
import ManageCerts from '../educators/certs/ManageCerts/ManageCerts'
import { withStyles } from '@material-ui/core/styles';
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
      <Route path={routes.studentHome} component={StudentHome} />
      <Route path={routes.studentLearnMore} component={StudentLearnMore}/>
      <Route path={routes.studentLogin} render={ props => {
        return (
          <LoginSignup {...props}>
            <Login {...props} />
          </LoginSignup>
        )
      }} />
      <Route path={routes.studentSignup} render={ props => {
        return (
          <LoginSignup {...props}>
            <BasicSignup {...props}/>
          </LoginSignup>
        )
      }} />
      <Route path={routes.studentSignupDetail} component={DetailSignup} />
      <Route path={routes.studentPhoto} render={ props => {
        return (
          <ImageUpload 
            type={'user'} 
            navigateNext={routes.studentHome}
            {...props}
          />
        )
      }} />
      <Route path={routes.studentViewCerts} component={ManageCerts} />
    </div>
  );
}

export default withStyles(styles)(StudentBase);