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
import ManageCerts from './certs/ManageCerts/ManageCerts'

import routes from '../../helpers/routes'
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
      <Route path={routes.educatorLearnMore} component={EducatorLearnMore}/>
      <Route path={routes.educatorLogin} render={ props => {
        return (
          <LoginSignup {...props}>
            <Login {...props} />
          </LoginSignup>
        )
      }} />
      <Route path={routes.educatorSignup} render={ props => {
        return (
          <LoginSignup {...props}>
            <Signup {...props}/>
          </LoginSignup>
        )
      }} />
      <Route 
        path={routes.educatorLogo} 
        render={ props => {
          return <ImageUpload 
                  type={'org'} 
                  navigateNext={routes.educatorHome} 
                  {...props}
                /> 
        }}
      />
      <Route exact path={routes.educatorHome} component={Home} />
      <Route exact path={routes.manageCourses} render={ () => {
        return <Courses locString={routes.updateCourse} {...props}/> 
      }}/>
      <Route exact path={routes.selectCourse} render={ () => {
        return <Courses locString={routes.issueCert} {...props}/> 
      }}/>
      <Route exact path={routes.createCourse} render={() => {
        return <CourseWizard title={'Create Course'} {...props}/>
      }}/>
      <Route exact path={routes.updateCourse} render={() => {
        return <CourseWizard title={'Update Course'} {...props}/>
      }}/>
      <Route exact path={routes.issueCert} component={IssueCert} />
      <Route exact path={routes.manageCerts} component={ManageCerts} />
    </div>
  );
}

export default withStyles(styles)(Educators);