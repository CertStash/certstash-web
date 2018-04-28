import axios from 'axios'
const URL = 'http://localhost:8000/org'
export const GET_TEMPLATES = 'GET_TEMPLATES'
export const LOAD_TEMPLATE = 'LOAD_TEMPLATE'
export const LOAD_USERS = 'LOAD_USERS'
export const RESET = 'RESET'
export const FETCHING_USERS = 'FETCHING_USERS'
export const REMOVE_USER = 'REMOVE_USER'
const headers = {headers: {Authorization: localStorage.getItem('token')}}
export const createTemplate = (template, history) => {
  return dispatch => {
    axios.post(`${URL}/createTemplate`, template, {headers: {Authorization: localStorage.getItem('token')}})
      .then( response => {
        history.push('/educator/home')
      })
      .catch( err => console.log(err))
  }
}

export const getTemplates = (navigationCallback) => {
  return dispatch => {
    axios.get('http://localhost:8000/org/getTemplates', headers)
      .then( response => {
        dispatch({type: GET_TEMPLATES, templates: response.data}) 
        navigationCallback()
      })
      .catch( err => console.log(err))
  }
}

export const loadTemplate = ( template ) => {
  return { type: LOAD_TEMPLATE, template }
}

export const loadUsers = ( users ) => {
  return { type: LOAD_USERS, users }
}

export const getUser = (user) => {
  return dispatch => {
    dispatch({ type: FETCHING_USERS})
    axios.put(`${URL}/getUsersByEmail`, {users: [user.email]}, headers)
      .then( res => {
        dispatch(loadUsers(res.data))
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

export const issueCerts = (users, template) => {
  return dispatch => {
    const certsObject = { users, template }
    axios.post(`${URL}/issueCerts`, certsObject, headers)
      .then( response => {
        dispatch({type: RESET});
      })
      .catch( err => console.log(err))

    return { type: 'HSJDH'}
  }
}