import React from 'react'

import Header from './components/welcome/header'
import Welcome from './components/welcome/welcome'
import Educators from './components/educators/educatorsBase'
import LoginChoice from './components/loginSignup/loginChoice'
import StudentBase from './components/students/studentBase'
import { Route } from 'react-router-dom'

import routeStrings from './helpers/routeStrings'



function App(props){
  return (
    <div>
      <Header history={props.history}/>
      <Route exact path={routeStrings.home} component={Welcome} />
      <Route path={routeStrings.loginChoice} component={LoginChoice} />
      <Route path={routeStrings.educator} component={Educators} />
      <Route path={routeStrings.student} component={StudentBase} />
    </div>
  )
}

export default App