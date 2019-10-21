import React from 'react'
import * as apiUser from '../../api/User'
import * as apiStation from '../../api/Station'
import * as hash from '../../utils/hash'
import * as security from '../../utils/security'
import { withTranslation } from 'react-i18next';

class FormModal extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		Name: '', 
    		Password: '',
    		ConfirmPassword: '',
    		Gender: '',
    		Age: '',
    		Location: '',
    		State: '',
    		Latitude: '',
    		Longitude: '',
    		Zip: '',
    		Temperature: '',
    		Humidity: '',
    		Pressure: '',
    		PasswordError: false
    	};

    	this.handleChange = this.handleChange.bind(this);
    	this.confirmedClick = this.confirmedClick.bind(this);
    }

    componentWillMount() {
    	switch(this.props.mode) {
			case 'edit-user':
				this.setState({
					Name: this.props.user.username,
					Password: '',
					ConfirmPassword: '',
					Gender: this.props.user.gender,
					Age: this.props.user.age
				});
				break;
			case 'edit-station':
				this.setState({
					Latitude: this.props.station.latitude,
					Longitude: this.props.station.longitude,
					Location: this.props.station.location,
					State: this.props.station.state,
					Zip: this.props.station.zip
				});
				break;
			default:
				break;
		}
    }

    handleClick(event) {
    	event.stopPropagation();
    }

    handleChange(property, value) {
    	this.setState({ [property]: value });
    }

    editUser() {
    	let params = {};
    	if (this.state.Name !== this.props.user.username) {
    		params.userName = this.state.Name;
    	}
    	if (this.state.Password !== '') {
    		const hashedPassword = hash.hashPassword(this.state.Password);
    		//params.password = hashedPassword;
    		params.password = this.state.Password;
    	}
    	if (this.state.ConfirmPassword !== '') {
    		const hashedPasswordCheck = hash.hashPassword(this.state.ConfirmPassword);
    		//params.passwordCheck = hashedPasswordCheck;
    		params.passwordCheck = this.state.ConfirmPassword;
    	}
    	if (this.state.Gender !== this.props.user.gender) {
    		params.gender = security.escapeParam(this.state.Gender);
    	}
    	if (this.state.Age !== this.props.user.age) {
    		params.age = this.state.Age;
    	}

    	if (params.password && params.passwordCheck) {
    		if (params.password !== params.passwordCheck) {
    			this.setState({PasswordError: true});
    		}
    		else {
    			this.props.closeFormModal();
    			params.id = this.props.user.id;
    			apiUser.editUser(params, this.props.t('StationEditErrorUser'));
    		}
    	} else if (Object.keys(params).length) {
    		this.props.closeFormModal();
    		params.id = this.props.user.id;
    		apiUser.editUser(params, this.props.t('StationEditErrorUser'));
    	} else {
    		this.props.closeFormModal();
    	}
    }

    editStation() {
    	let params = {};
    	if (this.state.Latitude !== this.props.station.latitude) {
    		params.latitud = this.state.Latitude;
    	}
    	if (this.state.Longitude !== this.props.station.longitude) {
    		params.longitud = this.state.Longitude;
    	}
    	if (this.state.Location !== this.props.station.location) {
    		params.location = security.escapeParam(this.state.Location);
    	}
    	if (this.state.State !== this.props.station.state) {
    		params.state = security.escapeParam(this.state.State);
    	}
    	if (this.state.Zip !== this.props.station.zip) {
    		params.postalCode = this.state.Zip;
    	}
    	if (Object.keys(params).length) {
    		params.id = this.props.station.id;
    		apiStation.editStation(params, this.props.t('EditStationError'), this.props.t('StationEdited'));
    	}
    }

    confirmedClick() {
    	switch(this.props.mode) {
    		case 'new-station':
    			this.props.closeFormModal();
    			apiStation.newStation(
    				this.props.user.id, 
    				this.state.Latitude, 
    				this.state.Longitude, 
    				security.escapeParam(this.state.Location), 
    				security.escapeParam(this.state.State),
    				this.state.Zip,
    				this.props.t('StationCreated'));
    			break;
    		case 'edit-user':
    			this.editUser();
    			break;
    		case 'edit-station':
    			this.props.closeFormModal();
    			this.editStation();
    			break;
    		case 'add-register':
    			this.props.closeFormModal();
    			apiStation.addRegister(
    				this.props.station.id, 
    				this.state.Temperature, 
    				this.state.Humidity, 
    				this.state.Pressure,
    				this.props.t('StationEdited'));
    			break;
    		default:
    			break;
    	}
    }

	render() {
		let visibilityClassName = this.props.visible ? '' : 'hidden';
		let message = '';
		let formBody = {};
		switch(this.props.mode) {
			case 'edit-user':
				message = this.props.t('EditUser');
				formBody = {
					'Name': this.props.user.username,
					'Password': '',
					'ConfirmPassword': '',
					'Gender': this.props.user.gender,
					'Age': this.props.user.age
				}
				break;
			case 'new-station':
				message = this.props.t('CreateStation');
				formBody = {
					'Latitude': '',
					'Longitude': '',
					'Location': '',
					'State': '',
					'Zip': ''
				}
				break;
			case 'edit-station':
				message = this.props.t('EditStation');
				formBody = {
					'Latitude': this.props.station.latitude,
					'Longitude': this.props.station.longitude,
					'Location': this.props.station.location,
					'State': this.props.station.state,
					'Zip': this.props.station.zip
				}
				break;
			case 'add-register':
				message = this.props.t('AddNewRegister');
				formBody = {
					'Temperature': '',
					'Humidity': '',
					'Pressure': ''
				}
				break;
			default:
				break;
		}
		
		let formItems = [];
		for (let [key, value] of Object.entries(formBody)) {
			let type = (key === 'Password' || key === 'ConfirmPassword') ? 'password' :  'text';
			let pattern = false;
			let title = ''
			if (key === 'Password' || key === 'ConfirmPassword') {
				pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$";
				title = this.props.t('PasswordRegex');
			} 
			else if (key === 'Name') {
				pattern = "[a-zA-Z0-9]+";
				title = this.props.t('UsernameRegex'); 
			}
			else if (key === 'Latitude' || key === 'Longitude' || key === 'Temperature') {
				pattern = "(-?)+[0-9]+([\.,][0-9]+)?";
				title = this.props.t('NumericDecimalNegativeRegex');
			}
			else if (key === 'Humidity' || key === 'Pressure') {
				pattern = "[0-9]+([\.,][0-9]+)?";
				title = this.props.t('NumericDecimalRegex');
			}
			else if (key === 'Age' || key === 'Zip') {
				pattern = "[0-9]+";
				title = this.props.t('NumericRegex');
			}
			if (key === 'Gender') {
				formItems.push(
					<div className='form-item'key={key}>
						<label htmlFor={key}>{this.props.t(key)}</label>
						<div id='form-item-gender'>
							<input 
								className='gender-radio' 
								type="radio" name="gender"
								checked={this.state[key] === 'male'}
								onChange={e => this.handleChange(key, e.target.value)} 
								value="male"/> {this.props.t('male')}  
	  						<input 
	  							className='gender-radio' 
	  							type="radio"
	  							name="gender"
	  							checked={this.state[key] === 'female'}
	  							onChange={e => this.handleChange(key, e.target.value)}  
	  							value="female"/> {this.props.t('female')}  
	  						<input 
	  							className='gender-radio' 
	  							type="radio" 
	  							name="gender"
	  							checked={this.state[key] === 'other'}
	  							onChange={e => this.handleChange(key, e.target.value)}  
	  							value="other"/> {this.props.t('other')}
  						</div>
					</div>
				);
			}
			else {
			    formItems.push(
			    	<div className='form-item' key={key}>
	  					<label htmlFor={key}>{this.props.t(key)}</label>
		  				<input
		  					id={key} 
		  					type={type}
		  					pattern={pattern}
		  					title={title}
		  					onChange={e => this.handleChange(key, e.target.value)}
		  					value={this.state[key]}
		  					required={(this.props.mode === 'new-station' || this.props.mode === 'add-register')}>
		  				</input>
	  				</div>
			    );
		    }
		}

		let  errorVisibilityClassName = this.state.PasswordError ? '' : 'hidden';
		
		return (
			<div id='outside' className={visibilityClassName} onClick={() => this.props.closeFormModal()}>
				<div id='form-modal' className={visibilityClassName} onClick={this.handleClick}>
					<a id="close-button" className="close-icon" onClick={() => this.props.closeFormModal()}>X</a>
					<form id='form-body' 
						onSubmit={e => {
              				e.preventDefault();
              				this.confirmedClick();
            			}}>
						<p id='modal-message'>{message}</p>
						<div id='form-items'>
							{formItems}
				  		</div>
				  		<div id='form-modal-error' className={errorVisibilityClassName}>
			  				<p>{this.props.t('ErrorRegisterPw')}</p>
			  			</div>
				  		<div className='form-modal-buttons'>
							<button id="green-button" className="general-button" type='submit'>
								{this.props.t('Confirm')}
							</button>
							<button id="cancel-button" className="general-button" onClick={() => this.props.closeFormModal()}>
								{this.props.t('Cancel')}
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
  
}

export default withTranslation()(FormModal);
