import axios from 'axios'

export const GET_PROFILE = 'GET_PROFILE'
export const CLEAR_PROFILE = 'CLEAR_PROFILE'
const ROOT_URL = 'http://localhost:8000/user'

const getHeaders = () => {
  try {
    return {headers: {Authorization: localStorage.getItem('token')}}
  } catch(err) {
    console.log(err)
  }
}

export const getUserProfile = (username) => {
  const headers = getHeaders();
  return dispatch => {
    axios.get(`${ROOT_URL}/profile?username=${username}`, headers)
      .then( profile => {
        dispatch({type: GET_PROFILE, profile: profile.data.user})
      })
      .catch( err => console.log(err))
  }
}