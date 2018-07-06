import { LOGIN_ORG, LOGOUT } from '../actions/org'
import { GET_COURSES } from '../actions/certActions'
import { loadOrgState } from '../helpers/persistState'
const defaultState = {
  orgName: '',
  email: '',
  phone: '',
  dateJoined: new Date(),
  courses: []
}

const loadedState = loadOrgState() || defaultState

export default function orgReducer(state = loadedState, action){
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