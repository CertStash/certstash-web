import { uniqBy, uniq } from 'lodash'
import { 
  LOAD_COURSE, 
  REVOKE_CERT, 
  REINSTATE_CERT,
  LOAD_USERS, 
  RESET, 
  FETCHING_USERS, 
  REMOVE_USER, 
  REMOVE_REJECTED, 
  ISSUING_CERTS, 
  CLEAR_COURSE, 
  GET_CERTS
} from '../actions/certActions'

const defaultState = {
  course: {},
  users: [],
  rejectedUsers: [],
  fetchingUsers: false,
  issuing: false,
  loadedUsers: false,
  certs: []
}

export default ( state = defaultState, action ) => {
  switch(action.type){
    case LOAD_COURSE: 
      return Object.assign({}, state, { course: action.course })
    case LOAD_USERS:
      // Compare the list of requested users to the list of user object received from the server
      let rejectedUsers = action.requestedUsers.reduce( (arr, email) => {
        // Using RegExp in order to search for inconsistencies in casing
        let emailRegExp = new RegExp(email, 'i')
        // Using filter, check to see if the requested user has been returned as a user object
        let filteredUsers = action.users.filter( userObj => {
          return userObj.email.match(emailRegExp)
        })
        // If no user object was found containing the email, add the email to the list of rejectedUsers
        if(filteredUsers.length === 0){
          arr.push(email)
          return arr
        }
        return arr
      }, [...state.rejectedUsers])
      rejectedUsers = uniq(rejectedUsers)
      // Make sure we only have one of each user in the array. 
      const newUsersState = uniqBy([...state.users,...action.users], '_id')
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
    case REVOKE_CERT:
      let revokedCerts = state.certs.map( cert => {
        if(cert._id === action.id){
          return Object.assign({}, cert, {isRevoked: true})
        } else {
          return cert
        }
      })
      return Object.assign({}, state, {certs: revokedCerts})
    case REINSTATE_CERT:
      let reinstatedCerts = state.certs.map( cert => {
        if(cert._id === action.id){
          return Object.assign({}, cert, {isRevoked: false})
        } else {
          return cert
        }
      })
      return Object.assign({}, state, {certs: reinstatedCerts})
    case CLEAR_COURSE:
      return Object.assign({}, state, {course: {}})
    case GET_CERTS:
      return Object.assign({}, state, {certs: action.certs})
    case RESET:
      return defaultState
    default:
      return state
  }
}