import * as array from '../utils/array'

const filteredStations = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTERED_STATIONS':
      let stations = array.getArrayOf(action.stations);
      stations.forEach(function (station) {
          station.animation = false;
          station.openPopUp = false;
          station.id = station.uuidStation;
          station.latitude = Number(station.latitud);
          station.longitude = Number(station.longitud);
          station.location = station.location;
          station.state = station.state;
          station.user = station.uuidUser;
          station.zip = station.postalCode;
          station.postalCode = station.postalCode;
          station.temperature = Number(station.temp).toFixed(2);
          station.humidity = Number(station.humidity).toFixed(2);
          station.pressure = Number(station.presion).toFixed(2);
          station.registers = station.historic;
          station.predictions = station.predictions;
      });
      return stations;
    default:
      return state
  }
}

export default filteredStations
