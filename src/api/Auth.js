import { store } from '../index'
import * as actions from '../actions'
import { setUserInfo } from './User'
import { getAllUserStations, getAllStations } from './Stations'
import * as uuid from '../utils/uuid'
import * as config from '../utils/config'

export function doLogin(username, password) {
  let formData = new FormData();
  formData.append('userName', username);
  formData.append('password', password);

  store.dispatch(actions.setSpinnerMode(true));

  fetch("http://" + config.params.middleApiIp + "/apiv1/user/login/", {
    method: 'POST',
    body: formData
  }).then(function(res) {
    switch(res.status) {
      case 404:
        sessionStorage.setItem("status", 2);
        break;
      case 403:
        sessionStorage.setItem("status", 3);
        break;
      case 200:
        res.json().then(function (result) {
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("tokenTroll", 'dsfdsfsdfsdfsfsffsfsdfssddsfsd');
          sessionStorage.setItem("session", result.uuidUser);
          setUserInfo(result.uuidUser, true);
          getAllStations();
        });
        break;
      default:
        sessionStorage.setItem("status", 6);
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  });
}

export function doRegister(username, password, passwordCheck) {
  let id = uuid.generateUuid();
  
  let formData = new FormData();
  formData.append('uuidUser', id);
  formData.append('userName', username);
  formData.append('password', password);
  formData.append('name', ' ');
  formData.append('lastname', ' ');
  formData.append('age', 25);
  formData.append('gender', ' ');
	
  store.dispatch(actions.setSpinnerMode(true));
	
  fetch("http://" + config.params.middleApiIp + "/apiv1/user/", {
		method: 'POST',
		body: formData
	}).then(function(res) {
    switch(res.status) {
      case 400:
        sessionStorage.setItem("status", 4);
        break;
      case 201:
        sessionStorage.setItem("status", -1);
        break;
      default:
        sessionStorage.setItem("status", 6);
        break;
    }
    store.dispatch(actions.setSpinnerMode(false));
  })
}

export function doLogout() {
	store.dispatch(actions.setFilteredStations({stations: []})); 
	sessionStorage.setItem("session", 0);
  sessionStorage.setItem("status", 0);
  sessionStorage.setItem("token", undefined);
	sessionStorage.setItem("station", undefined);
  sessionStorage.setItem("userId", undefined);
}