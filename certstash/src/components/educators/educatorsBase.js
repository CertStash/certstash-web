import React from 'react'
import EducatorLearnMore from './educatorLearnMore'
import LoginSignup from '../loginSignup/loginSignup'
import Login from './loginSignup/login'
import Signup from './loginSignup/signup'
import ImageUpload from '../loginSignup/ImageUpload'
import Home from './home'
import Courses from './courses/courses'
import CourseWizard from './courses/CourseWizard'
import IssueCert from './certs/issueCert'

import routeStrings from '../../helpers/routeStrings'
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom'
const styles = {
  root: {
    marginTop: '64',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
};

function Educators(props){
  const { classes, match } = props;
  return  (
    <div className={classes.root}>
      <Route path={routeStrings.educatorLearnMore} component={EducatorLearnMore}/>
      <Route path={routeStrings.educatorLogin} render={ props => {
        return (
          <LoginSignup {...props}>
            <Login {...props} />
          </LoginSignup>
        )
      }} />
      <Route path={routeStrings.educatorSignup} render={ props => {
        return (
          <LoginSignup {...props}>
            <Signup {...props}/>
          </LoginSignup>
        )
      }} />
      <Route 
        path={routeStrings.educatorLogo} 
        render={ props => {
          return <ImageUpload 
                  type={'org'} 
                  navigateNext={routeStrings.educatorHome} 
                  {...props}
                /> 
        }}
      />
      <Route exact path={routeStrings.educatorHome} component={Home} />
      <Route exact path={routeStrings.createCourse} component={CourseWizard} />
      <Route exact path={routeStrings.manageCourses} render={ () => {
        return <Courses locString={routeStrings.updateCourse} {...props}/> 
      }}/>
      <Route exact path={routeStrings.selectCourse} render={ () => {
        return <Courses locString={routeStrings.issueCert} {...props}/> 
      }}/>
      <Route exact path={routeStrings.issueCert} component={IssueCert} />
    </div>
  );
}

export default withStyles(styles)(Educators);