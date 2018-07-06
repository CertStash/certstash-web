import { parsePhone } from '../helpers/validationHelper.js'
import axios from 'axios'
const ROOT_URL = 'http://localhost:8000/org'
export const LOGIN_ORG = 'LOGIN_ORG'
export const FAILED_WRONG = 'FAILED_WRONG'
export const LOGOUT = 'LOGOUT'
export const FAILED_ALREADY_IN_USE = 'FAILED_ALREADY_IN_USE'

const loginCallback = ( dispatch ) => {
  return ( res ) => {
    if(res.data.token !== undefined){
      localStorage.setItem('token', res.data.token);
    }
    dispatch({
      type: LOGIN_ORG,
      org: res.data.user
    })
    Promise.resolve();
  }
}

export const logIn = (email, password, navigationCallback ) => {
  return function(dispatch){
    axios.put(`${ROOT_URL}/login`, { email, password })
      .then( loginCallback(dispatch) )
      .then( navigationCallback )
      .catch( err => {
        dispatch({ type: FAILED_WRONG })
      })
  }
}

export const logout = () => {
  return dispatch => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('org');
      localStorage.removeItem('token');
    } catch(err){
      console.log(err)
    }
    dispatch({type: LOGOUT})

  }
} 

export const signup = (email, password, orgName, phone, navigationCallback) => {
  const parsedPhone = parsePhone(phone)
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, orgName, phone: parsedPhone })
    .then( loginCallback( dispatch ) )
    .then( navigationCallback )
    .catch( err => dispatch({ type: FAILED_ALREADY_IN_USE }) )
  }
}

