import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../resources/img/logo_white.png';
import * as apiUser from '../api/User';
import * as apiStations from '../api/Stations';
import { store } from '../index'
import * as actions from '../actions'
import { withTranslation } from 'react-i18next';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
    	return (
    		<div id='header'>
			    <nav id='header-links'>
                    <Link 
                        onClick={() => {
                            store.dispatch(actions.setFilteredStations({stations: []}));
                            apiStations.getAllStations()
                        }} 
                        to="/home" 
                        id="home-link">
                        <img id='header-logo' alt='Logo' src={logo}/>
                    </Link>
			      	<Link
                        onClick={() => {
                            apiUser.setUserInfo(this.props.user.id, true) 
                            apiStations.getAllUserStations(this.props.user.id)
                        }}
                        to="/user" 
                        id="user-link" 
                        className="header-link">
                        <i className="fas fa-user"></i>
                        {this.props.user.username}
                    </Link>
			      	<Link 
                        onClick={() => this.props.openLogoutModal('logout')}
                        to="#"
                        id="logout-link" 
                        className="header-link">
                        <i className="fas fa-sign-out-alt"></i>
                        {this.props.t('Logout')}
                    </Link>
			    </nav>
		  	</div>
    	);
    }
}

export default withTranslation()(Header);
