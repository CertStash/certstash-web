import { LOAD_TEMPLATE, LOAD_USERS, RESET, FETCHING_USERS, REMOVE_USER } from '../actions/certActions'

const defaultState = {
  template: {},
  users: [],
  fetchingUsers: false,
  loadedUsers: false
}

export default ( state = defaultState, action ) => {
  switch(action.type){
    case LOAD_TEMPLATE: 
      return Object.assign({}, state, { template: action.template })
    case LOAD_USERS:
      return Object.assign({}, state, { users: [...state.users, ...action.users], fetchingUsers: false, loadedUsers: true })
    case FETCHING_USERS:
      return Object.assign({}, state, {fetchingUsers: true})
    case REMOVE_USER:
      const updatedUsers = state.users.filter( user => {
        return user._id !== action.user._id
      })
      return Object.assign({}, state, { users: updatedUsers, loadedUsers: false })
    case RESET:
      return defaultState
    default:
      return state
  }
}