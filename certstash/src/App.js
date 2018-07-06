import React from 'react'

import Header from './components/welcome/Header'
import Welcome from './components/welcome/Welcome'
import Educators from './components/educators/EducatorBase'
import LoginChoice from './components/loginSignup/LoginChoice'
import StudentBase from './components/students/StudentBase'
import CertList from './components/students/Stash/CertList'
import { Route } from 'react-router-dom'

import routes from './helpers/routes'



function App(props){
  return (
    <div>
      <Header history={props.history}/>
      <Route exact path={routes.home} component={Welcome} />
      <Route path={routes.loginChoice} component={LoginChoice} />
      <Route path={routes.educator} component={Educators} /> 
      <Route path={routes.student} component={StudentBase} />
      <Route path={routes.stash} component={CertList} />
    </div>
  )
}

export default App