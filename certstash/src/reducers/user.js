import { LOGOUT } from '../actions/org'
import { LOGIN_USER } from '../actions/user'
import { loadUserState } from '../helpers/persistState'
const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isAdmin: false,
  dateJoined: new Date(),
  certifications: []
}

const loadedState = loadUserState() || defaultState

export default function userReducer(state = loadedState, action){
  switch(action.type){
    case LOGIN_USER:
      return action.user;
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
