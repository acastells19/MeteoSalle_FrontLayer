import React from 'react'
import StationInfoComponent from './StationInfoComponent'
import StationDataComponent from './StationDataComponent'
import { Redirect } from 'react-router-dom'

class StationComponent extends React.Component {

	constructor(props) {
    	super(props);
    }

    renderRedirect() {
        if (sessionStorage.token === undefined || sessionStorage.token === 'undefined') {
            return (
                <Redirect to='/login'/>
            );  
        }
        else {
            sessionStorage.setItem("userId", undefined);
        }
    }

	render() {
		sessionStorage.setItem("station", JSON.stringify(this.props.station));
		return (
			<div id='station-main' className="container">
				{this.renderRedirect()}
				<div className="row">
			    	<StationInfoComponent 
			    		user={this.props.user}
			    		info={this.props.station}
			    		openDeleteStationModal={this.props.openDeleteStationModal}
			    		openEditStationModal={this.props.openEditStationModal}
			    	/>
			    	<StationDataComponent 
			    		user={this.props.user}
			    		data={this.props.station}
			    		openEditStationModal={this.props.openEditStationModal}
			    	/>
			    </div>
			</div>
		);
	}
}

export default StationComponent
