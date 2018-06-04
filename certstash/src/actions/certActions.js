import axios from 'axios'
import routes from '../helpers/routes'
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
export const CLEAR_COURSE = 'CLEAR_COURSE'

const getHeaders = () => {
  return {headers: {Authorization: localStorage.getItem('token')}}
}

// Actions:
export const createCourse = (course, history) => {
  const headers = getHeaders()
  return dispatch => {
    axios.post(`${URL}/createCourse`, course, headers)
      .then( response => {
        history.push(routes.educatorHome)
      })
      .catch( err => console.log(err))
  }
}

export const updateCourse = (course, id, navigationCallback) => {
  const headers = getHeaders()
  return dispatch => {
    axios.put(`${URL}/course/${id}`, course, headers)
      .then( response => {
        navigationCallback()
      })
      .catch( err => console.log(err))
  }
}

export const deleteCourse = (course, navigationCallback) => {
  const headers = getHeaders()
  return dispatch => {
    axios.delete(`${URL}/course/${course._id}`, headers)
      .then( () => {
        dispatch(getCourses(navigationCallback))
      })
      .catch( err => console.log(err) )
  }
}
  
export const getCourses = ( navigationCallback ) => {
  const headers = getHeaders()
  return dispatch => {
    axios.get(`${URL}/getCourses`, headers)
    .then( response => {
      const courses = response.data.filter( course => course.isValid )
      dispatch({ type: GET_COURSES, courses }) 
      navigationCallback()
    })
    .catch( err => console.log(err))
  }
}
  
export const loadCourse = ( course ) => {
  return { type: LOAD_COURSE, course }
}

export const clearCourse = () => {
  return { type: CLEAR_COURSE }
}

export const loadUsers = ( users, requestedUsers ) => {
  return { type: LOAD_USERS, users, requestedUsers }
}

export const getUsers = (requestedUsers) => {
  const headers = getHeaders()
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

export const issueCerts = (users, course, instructor) => {
  const headers = getHeaders()
  return dispatch => {
    const certsObject = { users, course, instructor }
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