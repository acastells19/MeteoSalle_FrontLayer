export const setCurrentUserInfo = user => ({
  type: 'SET_USER',
  id: user.uuidUser,
  username: user.userName,
  gender: user.gender ? user.gender : '-',
  age: user.age ? user.age : '-',
  location: user.location ? user.location : '-'
})

export const setCurrentStationInfo = station => ({
  type: 'SET_STATION',
  id: station.uuidStation,
  state: station.state,
  location: station.location,
  zip: station.postalCode,
  latitude: station.latitud,
  longitude: station.longitud,
  temperature: station.temp,
  humidity: station.humidity,
  pressure: station.presion,
  user: station.uuidUser,
  registers: station.historic,
  predictions: station.predictions
})

export const setStationPredictions = station => ({
  type: 'SET_PREDICTIONS',
  station: station
})

export const setStationsReturned = stations => ({
  type: 'SET_STATIONS',
  stations: stations.stations
})

export const setFilteredStations = stations => ({
  type: 'SET_FILTERED_STATIONS',
  stations: stations.stations
})

export const setSessionToken = token => ({
  type: 'SET_SESSION',
  session: token
})

export const setSpinnerMode = spinner => ({
  type: 'SET_SPINNER',
  spinner: spinner
})
