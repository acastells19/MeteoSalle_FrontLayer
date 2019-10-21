import { store } from '../index'
import * as actions from '../actions'
import { doLogout } from './Auth'
import * as config from '../utils/config'

export function setUserInfo(id, closeSpinner) {
	store.dispatch(actions.setSpinnerMode(true));
	
  fetch("http://" + config.params.middleApiIp + "/apiv1/user/" + id, {
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
          if (result.user) {
            store.dispatch(actions.setCurrentUserInfo(result.user));
          }
          store.dispatch(actions.setFilteredStations({stations: []})); 
        });
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function deleteUser(id) {
	store.dispatch(actions.setSpinnerMode(true));

  fetch("http://" + config.params.middleApiIp + "/apiv1/user/" + id, { 
    method: 'DELETE',
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
        doLogout();
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function editUser(params, message) {
  let formBody = [];
  for (let param in params) {
    formBody.push(param + "=" + params[param]);
  }

	store.dispatch(actions.setSpinnerMode(true));

  fetch("http://" + config.params.middleApiIp + "/apiv1/user/" + params.id + "?" + formBody.join("&"), {
		method: 'PUT',
    headers: {
      'Authorization': sessionStorage.token
    }
  }).then(function(res) {
    switch(res.status) {
      case 403:
        sessionStorage.setItem("status", 7);
        sessionStorage.setItem("token", undefined);
        break;
      case 400:
        alert(message);
      case 200:
        setUserInfo(params.id, true);
        break;
      default:
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}