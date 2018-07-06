import { GET_PROFILE, CLEAR_PROFILE } from '../actions/profileActions'

const defaultState = {
  firstName: '',
  lastName: '',
  description: '',
  location: '',
  occupation: '',
  certs: []
}

export default function(state = defaultState, action = {}){
  switch(action.type){
    case GET_PROFILE: 
      return action.profile 
    case CLEAR_PROFILE:
      return defaultState
    default:
      return state;
  }
}
