import axios from 'axios'
import routeStrings from '../helpers/routeStrings'
const URL = 'http://localhost:8000/org'

// Redux action types:
export const GET_COURSES = 'GET_COURSES'
export const LOAD_COURSE = 'LOAD_COURSE'
export const LOAD_USERS = 'LOAD_USERS'
export const RESET = 'RESET'
export const FETCHING_USERS = 'FETCHING_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const REMOVE_REJECTED = 'REMOVE_REJECTED'
export const ISSUING_CERTS = 'ISSUING_CERTS'

// Axios headers:
const headers = {headers: {Authorization: localStorage.getItem('token')}}

// Actions:
export const createCourse = (course, history) => {
  return dispatch => {
    axios.post(`${URL}/createCourse`, course, {headers: {Authorization: localStorage.getItem('token')}})
      .then( response => {
        history.push(routeStrings.educatorHome)
      })
      .catch( err => console.log(err))
  }
}

export const getCourses = (navigationCallback) => {
  return dispatch => {
    axios.get('http://localhost:8000/org/getCourses', headers)
      .then( response => {
        dispatch({type: GET_COURSES, courses: response.data}) 
        navigationCallback()
      })
      .catch( err => console.log(err))
  }
}

export const loadCourse = ( course ) => {
  return { type: LOAD_COURSE, course }
}

export const loadUsers = ( users, requestedUsers ) => {
  return { type: LOAD_USERS, users, requestedUsers }
}

export const getUsers = (requestedUsers) => {
  return dispatch => {
    dispatch({ type: FETCHING_USERS})
    axios.put(`${URL}/getUsersByEmail`, {users: requestedUsers}, headers)
      .then( res => {
        setTimeout(() => {
          dispatch(loadUsers(res.data, requestedUsers))
        }, 500)
      })
      .catch( err => console.log(err))
  }
}

export const removeUser = (user) => {
  return {
    type: REMOVE_USER,
    user
  }
}

export const removeRejected = (email) => {
  return {
    type: REMOVE_REJECTED,
    email
  }
}

export const issueCerts = (users, course) => {
  return dispatch => {
    const certsObject = { users, course }
    dispatch({type: ISSUING_CERTS})
    axios.post(`${URL}/issueCerts`, certsObject, headers)
      .then( response => {
        setTimeout( () => {
          dispatch({type: RESET});
        }, 500)
      })
      .catch( err => console.log(err))

    return { type: 'HSJDH'}
  }
}