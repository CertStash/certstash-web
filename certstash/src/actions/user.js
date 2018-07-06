import { parsePhone } from '../helpers/validationHelper.js'
import axios from 'axios'
import { FAILED_ALREADY_IN_USE } from './org'
import { GET_CERTS } from './certActions'
export const LOGIN_USER = 'LOGIN_USER'

const ROOT_URL = 'http://localhost:8000/user'

const getHeaders = () => {
  return {headers: {Authorization: localStorage.getItem('token')}}
}

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

export const logIn = (email, password, navigationCallback) => {
  return function(dispatch){
    axios.put(`${ROOT_URL}/login`, { email, password })
      .then( loginCallback.bind(this, dispatch) )
      .then( navigationCallback )
      .catch( err => dispatch({ type: FAILED_ALREADY_IN_USE }) )
  }
}

export const signup = ( email, password, navigationCallback ) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { password, email })
      .then( loginCallback.bind(this, dispatch) )
      .then( navigationCallback )
      .catch( err => dispatch({ type: FAILED_ALREADY_IN_USE }))
  }
}

export const updateUser = ( userInfo, navigationCallback) => {
  return dispatch => {
    const headers = getHeaders()
    userInfo.phone = userInfo.phone ? parsePhone(userInfo.phone) : 0
    axios.put(`${ROOT_URL}/update`, userInfo, headers )
      .then( loginCallback.bind(this, dispatch) )
      .then( navigationCallback )
      .catch( err => console.log(err))
  }
}

export const getUserCerts = () => {
  const headers = getHeaders()
  return dispatch => {
    axios.get(`${ROOT_URL}/certs`, headers)
    .then( response => {
      dispatch({type: GET_CERTS, certs: response.data})
    })
    .catch( err => console.log(err))
  }
}