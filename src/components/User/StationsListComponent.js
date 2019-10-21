import React from 'react'
import StationsListItemComponent from './StationsListItemComponent'
import { withTranslation } from 'react-i18next';

class StationsListComponent extends React.Component {

	constructor(props) {
    	super(props);
    	this.getRenderStations = this.getRenderStations.bind(this);
    }

    getRenderStations() {
    	let component = this;
  		return this.props.stations.map(function (station) {
			return <StationsListItemComponent
				key={station.id} 
				station={station} 
				selectStation={component.props.selectStation}
			/>;
		});
    }

	render() {
		const renderStations = this.props.stations.length ? 
            this.getRenderStations() :
            <p id='no-list-items-message'>{this.props.t('NoUserStationsMessage')}</p>
		return (
			<div id="stations-list-wrapper" className="container col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
				<div id="stations-list-header">
					<h3 id='stations-list-title'>
						{this.props.t('Stations')}
					</h3>
					<button 
						id="new-station-button"
						onClick={() => this.props.openNewStationModal('new-station')}
						>
						{this.props.t('NewStation')}
					</button>
				</div>
			  	<div id='stations-list'>
			  		<div className='row'>
			  			{renderStations}
			  		</div>
			  	</div>
		  	</div>
		)	
	}
	
} 

export default withTranslation()(StationsListComponent);

