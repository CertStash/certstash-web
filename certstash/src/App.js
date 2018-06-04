import React from 'react'

import Header from './components/welcome/header'
import Welcome from './components/welcome/welcome'
import Educators from './components/educators/educatorsBase'
import LoginChoice from './components/loginSignup/loginChoice'
import StudentBase from './components/students/studentBase'
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
    </div>
  )
}

export default App