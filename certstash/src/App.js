import React from 'react'

import Header from './components/welcome/header'
import Welcome from './components/welcome/welcome'
import Educators from './components/educators/educatorsBase'
import LoginChoice from './components/loginSignup/loginChoice'
import StudentBase from './components/students/studentBase'
import { Route } from 'react-router-dom'



function App(props){
  return (
    <div>
      <Header history={props.history}/>
      <Route exact path='/' component={Welcome} />
      <Route path='/loginchoice' component={LoginChoice} />
      <Route path='/educator' component={Educators} />
      <Route path='/student' component={StudentBase} />
    </div>
  )
}

export default App