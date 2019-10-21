const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        id: action.id,
      	username: action.username,
      	gender: action.gender,
      	age: action.age,
      	location: action.location
      }
    default:
      return state
  }
}

export default user
