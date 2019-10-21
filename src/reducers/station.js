const station = (state = {}, action) => {
  switch (action.type) {
    case 'SET_STATION':
      return {
        id: action.id,
        state: action.state,
        location: action.location,
        zip: action.zip,
        latitude: Number(action.latitude),
        longitude: Number(action.longitude),
        temperature: Number(action.temperature).toFixed(2),
        humidity: Number(action.humidity).toFixed(2),
        pressure: Number(action.pressure).toFixed(2),
        user: action.user,
        registers: action.registers,
        predictions: action.predictions
      }
    case 'SET_PREDICTIONS':
      return action.station;
    default:
      return state
  }
}

export default station
