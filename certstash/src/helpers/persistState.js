export const loadOrgState = () => {
  try {
    const org = localStorage.getItem('org');
    return JSON.parse(org)
  } catch(error) {
    console.log(error)
  }
}

export const loadUserState = () => {
  try {
    const user = localStorage.getItem('user');
    return JSON.parse(user)
  } catch(err){
    console.log(err)
  }
}

export const saveOrgState = (org) => {
  try {
    localStorage.setItem('org', JSON.stringify(org))
  } catch(error) {
    console.log(error)
  }
}

export const saveUserState = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch(err) {
    console.log(err)
  }
}