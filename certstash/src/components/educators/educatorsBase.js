import React from 'react'
import EducatorLearnMore from './educatorLearnMore'
import LoginSignup from '../loginSignup/loginSignup'
import Login from './loginSignup/login'
import Signup from './loginSignup/signup'
import ImageUpload from '../loginSignup/ImageUpload'
import Home from './home'
import Templates from './templates/templates'
import TemplateWizard from './templates/TemplateWizard'
import IssueCert from './certs/issueCert'

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
      <Route path={`${match.url}/learnmore`} component={EducatorLearnMore}/>
      <Route path={`${match.url}/login`} render={ props => {
        return (
          <LoginSignup {...props}>
            <Login {...props} />
          </LoginSignup>
        )
      }} />
      <Route path={`${match.url}/signup`} render={ props => {
        return (
          <LoginSignup {...props}>
            <Signup {...props}/>
          </LoginSignup>
        )
      }} />
      <Route 
        path={`${match.url}/logo`} 
        render={ props => {
          return <ImageUpload 
                  type={'org'} 
                  navigateNext={`${match.url}/home`} 
                  {...props}
                /> 
        }}
      />
      <Route exact path={`${match.url}/home`} component={Home} />
      <Route exact path={`${match.url}/home/createTemplate`} component={TemplateWizard} />
      <Route exact path={`${match.url}/manageTemplates`} render={ () => {
        return <Templates locString={`${match.url}/updateTemplate`} {...props}/> 
      }}/>
      <Route exact path={`${match.url}/selectTemplate`} render={ () => {
        return <Templates locString={`${match.url}/issueCert`} {...props}/> 
      }}/>
      <Route exact path={`${match.url}/issueCert`} component={IssueCert} />
    </div>
  );
}

export default withStyles(styles)(Educators);