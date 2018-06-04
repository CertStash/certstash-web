import _ from 'lodash'
import { LOAD_COURSE, LOAD_USERS, RESET, FETCHING_USERS, REMOVE_USER, REMOVE_REJECTED, ISSUING_CERTS, CLEAR_COURSE } from '../actions/certActions'

const defaultState = {
  course: {},
  users: [],
  rejectedUsers: [],
  fetchingUsers: false,
  issuing: false,
  loadedUsers: false,
}

export default ( state = defaultState, action ) => {
  switch(action.type){
    case LOAD_COURSE: 
      return Object.assign({}, state, { course: action.course })
    case LOAD_USERS:
      const rejectedUsers = action.requestedUsers.reduce( (arr, email) => {
        let filteredUsers = action.users.filter( userObj => {
          return userObj.email === email
        })
        if(filteredUsers.length === 0){
          arr.push(email)
          return arr
        }
        return arr
      }, [...state.rejectedUsers])
      const newUsersState = _.uniqBy([...state.users,...action.users], '_id')
      return Object.assign({}, state, { users: newUsersState, rejectedUsers, fetchingUsers: false, loadedUsers: true })
    case FETCHING_USERS:
      return Object.assign({}, state, {fetchingUsers: true})
    case REMOVE_USER:
      const updatedUsers = state.users.filter( user => {
        return user._id !== action.user._id
      })
      return Object.assign({}, state, { users: updatedUsers, loadedUsers: false })
    case REMOVE_REJECTED:
      const filteredRejected = state.rejectedUsers.filter( email => {
        return email !== action.email
      })
      return Object.assign({}, state, {rejectedUsers: filteredRejected})
    case ISSUING_CERTS: 
      return Object.assign({}, state, {issuing: true})
    case CLEAR_COURSE:
      return Object.assign({}, state, {course: {}})
    case RESET:
      return defaultState
    default:
      return state
  }
}