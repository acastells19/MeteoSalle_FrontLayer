import React from 'react'
import MapElement from '../../utils/maps'
import * as config from '../../utils/config'
import * as states from '../../utils/state'
import { withTranslation } from 'react-i18next'

class StationInfoComponent extends React.Component {

	constructor(props) {
    	super(props);
    }

    render() {
    	let stationInfoButtons = this.props.user.id === this.props.info.user ? (
    		<div id="station-info-buttons">
				<button 
					id="edit-station-button"
					onClick={() => this.props.openEditStationModal('edit-station')}
					>
					{this.props.t('Edit')}
				</button>
				<button 
					id="delete-station-button"
					onClick={() => this.props.openDeleteStationModal('station')}
					>
					{this.props.t('Delete')}
				</button>
			</div>
    	) : '';
    	let state = isNaN(this.props.info.state) ? this.props.info.state : states.getStateFromCode(Number(this.props.info.state));
    	this.props.info.animation = false;
    	return (
    		<div id='station-info' className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-4">
			  	<MapElement
			  		id='station-map'
			  		autoAdjust={false}
                    zoom={8}
                    lat={this.props.info.latitude}
                    lng={this.props.info.longitude}
                    markers={[this.props.info]}
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + config.params.googleKey + "&language=" + this.props.t('Language')}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ width: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
			    <div id="station-info-data">
				    <p className="station-info-line">
				    	<span className="station-info-line-title">{this.props.t('Location')}: </span>{this.props.info.location}
			    	</p>
			    	<p className="station-info-line">
				    	<span className="station-info-line-title">{this.props.t('State')}: </span>{state}
				    </p>
				    <p className="station-info-line">
				    	<span className="station-info-line-title">{this.props.t('Latitude')}: </span>{this.props.info.latitude}
			    	</p>
				    <p className="station-info-line">
				    	<span className="station-info-line-title">{this.props.t('Longitude')}: </span>{this.props.info.longitude}
			    	</p>
				</div>
				{stationInfoButtons}
			</div>
    	);
    }
  
}

export default withTranslation()(StationInfoComponent);

