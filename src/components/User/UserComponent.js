import React from 'react'
import UserInfoComponent from './UserInfoComponent'
import StationsListComponent from './StationsListComponent'
import { Redirect } from 'react-router-dom'

class UserComponent extends React.Component {

	constructor(props) {
    	super(props);
    	let component = this;
    	this.state = {
           stations: this.props.stations.filter(function (station) {
	          		return station.user === component.props.user.id;
	       })
        }
    }

    renderRedirect(userId) {
        if (sessionStorage.token === undefined || sessionStorage.token === 'undefined') {
            return (
                <Redirect to='/login'/>
            );  
        }
        else {
            sessionStorage.setItem("userId", userId);
        }
    }

	render() {
		return (
	  		<div id='user-main' className="container">
	  			{this.renderRedirect(this.props.user.id)} 
				<div className="row">
	    			<UserInfoComponent 
	    				user={this.props.user}
	    				openDeleteUserModal={this.props.openDeleteUserModal}
	    				openEditUserModal={this.props.openEditUserModal}
	    			/>
	    			<StationsListComponent 
	    				stations={this.state.stations}
	    				selectStation={this.props.selectStation}
	    				openNewStationModal={this.props.openNewStationModal}
	    			/>
	    		</div>
	  		</div>
		);
	}
	
}

export default UserComponent
