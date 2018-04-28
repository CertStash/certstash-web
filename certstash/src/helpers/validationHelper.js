import axios from 'axios'
const ROOT_URL = 'http://localhost:8000'

export const EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE'
export const EMAIL_GOOD = 'EMAIL_GOOD'
export const PHONE_ALREADY_IN_USE = 'PHONE_ALREADY_IN_USE'
export const PHONE_GOOD = 'PHONE_GOOD'

export const parsePhone = (phone) => {
  return Number(phone.split('').map( item => {
    if(isNaN(Number(item))){
      return ''
    } else {
      return item
    }
  }).join(''));
}

export const validateEmail = (type, email) => {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/${type}/validateEmail`, {
      email
    })
    .then( res => {
      if(res.data.inUse){
        dispatch({ type: EMAIL_ALREADY_IN_USE })
      } else {
        dispatch({ type: EMAIL_GOOD })
      }
    })
    .catch( err => {
      console.log(err)
    })
  }
}

export const validatePhone = (type, phone) => {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/${type}/validatePhone`, {
      phone: parsePhone(phone)
    })
    .then( res => {
      if(res.data.inUse){
        dispatch({ type: PHONE_ALREADY_IN_USE })
      } else {
        dispatch({ type: PHONE_GOOD })
      }
    })
    .catch( err => {
      console.log(err)
    })
  }
}