const spinner = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SPINNER':
      if (action.spinner) {
      	return state + 1;
      } 
      else {
      	return state - 1;
      }
    default:
      return state
  }
}

export default spinner
