const session = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return action.session
    default:
      return 0
  }
}

export default session
