import { store } from '../index'
import * as actions from '../actions'
import * as config from '../utils/config'

export function getPredictions(station) {
	store.dispatch(actions.setSpinnerMode(true));
  fetch("http://" + config.params.middleApiIp + "/apiv1/predictions/" + station.zip, {
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
          if (result.predictions) {
            station.predictions = result.predictions;
            store.dispatch(actions.setStationPredictions(station));
          }
        });
        break;
      case 500:
        store.dispatch(actions.setStationPredictions(station));
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}