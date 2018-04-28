import { parsePhone } from '../helpers/validationHelper.js'
import axios from 'axios'
import { FAILED_ALREADY_IN_USE } from './org'
export const LOGIN_USER = 'LOGIN_USER'

const ROOT_URL = 'http://localhost:8000/user'

const loginCallback = ( dispatch, res) => {
  if(res.data.token !== undefined){
    localStorage.setItem('token', res.data.token);
  }
  dispatch({
    type: 'LOGIN_USER',
    user: res.data.user
  })
  Promise.resolve();
}

export const logIn = (email, password) => {
  return function(dispatch){
    axios.put(`${ROOT_URL}/login`, { email, password })
      .then( loginCallback.bind(this, dispatch) )
      .catch( err => dispatch({ type: FAILED_ALREADY_IN_USE }) )
  }
}

export const signup = (email, password, firstName, lastName, phone, navigationCallback ) => {
  const parsedPhone = parsePhone(phone)
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { password, email, firstName, lastName, phone: parsedPhone })
    .then( loginCallback.bind(this, dispatch) )
    .then( navigationCallback )
    .catch( err => dispatch({ type: FAILED_ALREADY_IN_USE }))
  }
}
