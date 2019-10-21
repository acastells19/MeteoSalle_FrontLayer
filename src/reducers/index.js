import { combineReducers } from 'redux'
import stations from './stations'
import filteredStations from './filteredStations'
import station from './station'
import user from './user'
import session from './session'
import spinner from './spinner'

export default combineReducers({
  stations,
  filteredStations,
  station,
  user,
  session,
  spinner
})
