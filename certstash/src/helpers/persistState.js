export const loadOrgState = () => {
  try {
    const org = localStorage.getItem('org');
    return JSON.parse(org)
  } catch(error) {
    console.log(error)
  }
}

export const saveOrgState = (org) => {
  try {
    localStorage.setItem('org', JSON.stringify(org))
  } catch(error) {
    console.log(error)
  }
}