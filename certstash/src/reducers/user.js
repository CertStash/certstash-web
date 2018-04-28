import { LOGOUT } from '../actions/org'
import { LOGIN_USER } from '../actions/user'

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isAdmin: false,
  dateJoined: new Date(),
  certifications: []
}

export default function userReducer(state = defaultState, action){
  switch(action.type){
    case LOGIN_USER:
      return action.user;
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
