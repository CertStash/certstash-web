import { LOGIN_ORG, LOGOUT } from '../actions/org'
import { GET_COURSES } from '../actions/certActions'
import { loadOrgState } from '../helpers/persistState'
const defaultState = loadOrgState() || {
  orgName: '',
  email: '',
  phone: '',
  dateJoined: new Date(),
  courses: []
}

export default function orgReducer(state = defaultState, action){
  switch(action.type){
    case LOGIN_ORG:
      return Object.assign({}, state, action.org)
    case LOGOUT:
      return defaultState
    case GET_COURSES:
      return Object.assign({}, state, {courses: action.courses})
    default:
      return state
  }
}