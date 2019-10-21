import React from 'react'
import { Link } from "react-router-dom";
import * as apiUser from '../../api/User'
import * as apiStation from '../../api/Station'
import * as apiAuth from '../../api/Auth'
import { withTranslation } from 'react-i18next';

class ConfirmationModal extends React.Component {

	constructor(props) {
    	super(props);
    	this.confirmedClick = this.confirmedClick.bind(this);
    }

    handleClick(event) {
    	event.stopPropagation();
    }

    confirmedClick() {
    	this.props.closeConfirmationModal();
    	switch(this.props.mode) {
    		case 'user':
    			apiUser.deleteUser(this.props.user.id);
    			break;
    		case 'station':
    			apiStation.deleteStation(this.props.station.id, this.props.user.id, this.props.t('StationDeleted'));
    			break;
    		case 'logout':
    			apiAuth.doLogout();
    			break;
    		default:
    			break;
    	}
    }

	render() {
		let visibilityClassName = this.props.visible ? '' : 'hidden';
		let message = '';
		let route = '/';
		switch(this.props.mode) {
			case 'logout':
				message = this.props.t('LogoutMessage');
				route = '/login';
				break;
			case 'user':
				message = this.props.t('DeleteUserMessage');
				route = '/login';
				break;
			case 'station':
				message = this.props.t('DeleteStationMessage');
				route = '/user';
				break;
			default:
				break;
		}
		return (
			<div id='outside' className={visibilityClassName} onClick={() => this.props.closeConfirmationModal()}>
				<div id='confirmation-modal' className={visibilityClassName} onClick={this.handleClick}>
					<a className="close-icon" onClick={() => this.props.closeConfirmationModal()}>X</a>
					<div id='confirmation-body'>
						<p id='modal-message'>{message}</p>
						<div className='confirm-modal-buttons'>
							<Link to={route}>
								<button id="red-button" className="general-button" onClick={this.confirmedClick}>
									{this.props.t('Confirm')}
								</button>
							</Link>
							<button id='cancel-button' className="general-button" onClick={() => this.props.closeConfirmationModal()}>
								{this.props.t('Cancel')}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
  
}

export default withTranslation()(ConfirmationModal);
