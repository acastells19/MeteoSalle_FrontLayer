import { store } from '../index'
import * as actions from '../actions'
import { getAllUserStations } from './Stations'
import { getPredictions } from './Predictions'
import * as uuid from '../utils/uuid'
import * as config from '../utils/config'

export function setSpecificStationInfo(idStation) {
	store.dispatch(actions.setSpinnerMode(true));
	
  fetch("http://" + config.params.middleApiIp + "/apiv1/stations/" + idStation, {
    headers: {
      'Authorization': sessionStorage.token
    }
  }).then(function(res) {
    switch(res.status) {
      case 403:
        sessionStorage.setItem("status", 7);
        sessionStorage.setItem("token", undefined);
        break;
      case 200:
        res.json().then(function (result) {
          if (result.station) {
            store.dispatch(actions.setCurrentStationInfo(result.station));  
          }
        });
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function deleteStation(id, user, message) {
	store.dispatch(actions.setSpinnerMode(true));
	
  fetch("http://" + config.params.middleApiIp + "/apiv1/stations/" + id, { 
    method: 'DELETE',
    headers: {
      'Authorization': sessionStorage.token
    } 
  }).then(function(res) {
    switch (res.status) {
      case 403:
        sessionStorage.setItem("status", 7);
        sessionStorage.setItem("token", undefined);
        break;
      case 200:
        /*store.dispatch(actions.setSpinnerMode(true));
        setTimeout(function() {*/
          //alert(message);
          getAllUserStations(user) 
          /*store.dispatch(actions.setSpinnerMode(false));
        }, 2000);*/
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function newStation(user, latitude, longitude, location, state, zip, message) {
	let id = uuid.generateUuid();

  let formData = new FormData();
  formData.append('uuidStation', id);
  formData.append('uuidUser', user);
  formData.append('latitud', latitude);
  formData.append('longitud', longitude);
  formData.append('postalCode', zip);
  formData.append('location', location);
  formData.append('state', state);
  formData.append('temp', ' ');
  formData.append('humidity', ' ');
  formData.append('presion', ' ');

  store.dispatch(actions.setSpinnerMode(true));

	fetch("http://" + config.params.middleApiIp + "/apiv1/stations/", {
		method: 'POST',
    headers: {
      'Authorization': sessionStorage.token
    },
		body: formData
  }).then(function(res) {
    switch (res.status) {
      case 403:
        sessionStorage.setItem("status", 7);
        sessionStorage.setItem("token", undefined);
        break;
      case 201:
        /*store.dispatch(actions.setSpinnerMode(true));
        setTimeout(function() {*/
          //alert(message);
          getAllUserStations(user) 
          /*store.dispatch(actions.setSpinnerMode(false));
        }, 2000);*/
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function editStation(params, errorMessage, message) {
	let formBody = [];
	for (let param in params) {
    formBody.push(param + "=" + params[param]);
  }

  store.dispatch(actions.setSpinnerMode(true));

	fetch("http://" + config.params.middleApiIp + "/apiv1/stations/" + params.id + "?" + formBody.join("&"), {
		method: 'PUT',
    headers: {
      'Authorization': sessionStorage.token
    }
  }).then(function(res) {
    switch (res.status) {
      case 403:
        sessionStorage.setItem("status", 7);
        sessionStorage.setItem("token", undefined);
        break;
      case 400:
        alert(errorMessage);
        break;
      case 200:
        /*store.dispatch(actions.setSpinnerMode(true));
        setTimeout(function() {*/
          //alert(message);
          setSpecificStationInfo(params.id);
          /*store.dispatch(actions.setSpinnerMode(false));
        }, 2000);*/
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function addRegister(id, temperature, humidity, pressure, message) {
  let formData = new FormData();
  formData.append('temp', temperature);
  formData.append('humidity', humidity);
  formData.append('presion', pressure);

	store.dispatch(actions.setSpinnerMode(true));

	fetch("http://" + config.params.middleApiIp + "/apiv1/stations/" + id + "/history", {
		method: 'POST',
    headers: {
      'Authorization': sessionStorage.token
    },
		body: formData
  }).then(function(res) {
    switch (res.status) {
      case 403:
        sessionStorage.setItem("status", 7);
        sessionStorage.setItem("token", undefined);
        break;
      case 201:
        editStation(
          {
            id: id, 
            temp: temperature,
            humidity: humidity,
            presion: pressure
          },
          '',
          message
        );
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}