import { store } from '../index'
import * as actions from '../actions'
import * as config from '../utils/config'

export function getAllStations() {
	store.dispatch(actions.setSpinnerMode(true));
	
  	fetch("http://" + config.params.middleApiIp + "/apiv1/stations/", {
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
			    	if (result.stations) {
			    		store.dispatch(actions.setStationsReturned({
							stations: result.stations
						}));
			    	}
		    	});
		    	break;
		    default:
		    	break;
    	}
    	store.dispatch(actions.setSpinnerMode(false));
    })
}

export function getAllUserStations(id) {
	store.dispatch(actions.setSpinnerMode(true));
	
  	fetch("http://" + config.params.middleApiIp + "/apiv1/user/" + id + "/stations", {
  		headers: {
			'Authorization': sessionStorage.token
		}
	}).then(function(res) {
		switch(res.status) {
			case 403:
				sessionStorage.setItem("status", 7);
		        sessionStorage.setItem("token", undefined);
		        break;
		    case 404:
		    	store.dispatch(actions.setStationsReturned({
					stations: {}
				}));
				break;
			case 200:
				res.json().then(function (result) {
					if (result.stations) {
						store.dispatch(actions.setStationsReturned({
							stations: result.stations
						}));
					}
				});
				break;
			default:
				break;
		}
		store.dispatch(actions.setSpinnerMode(false));
	})
}

export function getFilteredStations(postalCode, message) {
	store.dispatch(actions.setSpinnerMode(true));
  	fetch("http://" + config.params.middleApiIp + "/apiv1/stations/postalcode/" + postalCode, {
  		headers: {
			'Authorization': sessionStorage.token
		}
	}).then(function(res) {
		switch(res.status) {
    		case 403:
    			sessionStorage.setItem("status", 7);
		        sessionStorage.setItem("token", undefined);
		        break;
		    case 404:
		    	alert(message);
		    	break;
		    case 200:
		    	res.json().then(function (result) {
			    	if (result.stations) {
			    		store.dispatch(actions.setFilteredStations({
							stations: result.stations
						}));
			    	}
		    	});
		    	break;
		    default:
		    	break;
    	}
    	store.dispatch(actions.setSpinnerMode(false));
	})
}