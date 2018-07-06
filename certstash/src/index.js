import App from './App.js'
import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import './assets/defaultStyles.css'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';


import routes from './helpers/routes'

import * as reducers from './reducers/index'
import { saveOrgState, saveUserState } from './helpers/persistState'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  status: {
    danger: 'orange',
  },
});

const reducer = combineReducers({ ...reducers })

const store = createStore(
  reducer,
  applyMiddleware( thunk )
)

store.subscribe( () => {
  const state = store.getState()
  if(state.org.orgName !== ''){
    saveOrgState(state.org)
  }
  if(state.user.firstName !== ''){
    saveUserState(state.user)
  }
  return
})

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route path={routes.home} component={App} /> 
        </Router>
      </MuiThemeProvider>
  </Provider>
, document.getElementById('root'));

