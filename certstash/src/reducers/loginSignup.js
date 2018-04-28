import { PHONE_GOOD, EMAIL_GOOD, PHONE_ALREADY_IN_USE, EMAIL_ALREADY_IN_USE } from '../helpers/validationHelper'
import { FAILED_WRONG, LOGIN_ORG, LOGOUT } from '../actions/org'
import { LOGIN_USER } from '../actions/user'
let defaultState = {
  userType: '',
  emailAlreadyInUse: false,
  phoneAlreadyInUse: false,
  wrongEmailPassword: false
}

export default function(state = defaultState, action) {
  switch(action.type){
    case EMAIL_ALREADY_IN_USE:
      return Object.assign({}, state, {emailAlreadyInUse: true});
    case PHONE_ALREADY_IN_USE:
      return Object.assign({}, state, {phoneAlreadyInUse: true});
    case EMAIL_GOOD:
      return Object.assign({}, state, {emailAlreadyInUse: false});
    case PHONE_GOOD:
      return Object.assign({}, state, {phoneAlreadyInUse: false});
    case FAILED_WRONG:
      return Object.assign({}, state, {wrongEmailPassword: true})
    case LOGIN_USER :
      return Object.assign({}, defaultState, { userType: 'user'})
    case LOGIN_ORG:
      return Object.assign({}, defaultState, { userType: 'org'})
    case LOGOUT :
      return Object.assign({}, defaultState);
    default:
      return state;
  }
}