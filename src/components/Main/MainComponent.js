import React from 'react'
import MapComponent from './MapComponent'
import ListComponent from './ListComponent'
import { Redirect } from 'react-router-dom'
import * as apiStations from '../../api/Stations'
import { store } from '../../index'
import * as actions from '../../actions'
import * as security from '../../utils/security'
import { withTranslation } from 'react-i18next'

class MainComponent extends React.Component {

	constructor(props) {
    	super(props);
    	this.filterStations = this.filterStations.bind(this);
        this.animateStation = this.animateStation.bind(this);
        this.unAnimateStation = this.unAnimateStation.bind(this);
        this.openStationPopUp = this.openStationPopUp.bind(this);
        this.closeStationPopUp = this.closeStationPopUp.bind(this);
        this.state = {
           stations: this.props.stations || []
        }
    }

    componentWillMount() {
        if (this.props.filteredStations.length) {
            this.setState({stations: this.props.filteredStations})
        }
        this.state.stations.forEach(function (station) {
            station.animation = false;
            station.openPopUp = false;
        });
    }

    filterStations(searchPattern) {
        searchPattern = security.escapeParam(searchPattern);
        if (searchPattern !== "") {
            apiStations.getFilteredStations(searchPattern, this.props.t('FilteredStationsError'));
        } else {
            if (this.props.filteredStations.length) {
                store.dispatch(actions.setFilteredStations({stations: []}));   
            } 
        }
    }

    animateStation(idStation) {
        let stationIndex = this.state.stations.findIndex(station => station.id == idStation);
        this.state.stations[stationIndex].animation = true;
        this.setState({
            stations: this.state.stations
        })
    }

    unAnimateStation(idStation) {
        let stationIndex = this.state.stations.findIndex(station => station.id == idStation);
        this.state.stations[stationIndex].animation = false;
        this.setState({
            stations: this.state.stations
        })
    }

    openStationPopUp(idStation) {
        let stationIndex = this.state.stations.findIndex(station => station.id == idStation);
        this.state.stations[stationIndex].openPopUp = true;
        this.setState({
            stations: this.state.stations
        })
    }

    closeStationPopUp(idStation) {
        let stationIndex = this.state.stations.findIndex(station => station.id == idStation);
        this.state.stations[stationIndex].openPopUp = false;
        this.setState({
            stations: this.state.stations
        })
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
		return (
			<div id='main' className="container">
                {this.renderRedirect()} 
				<div className="row">
    				<MapComponent 
                        stations={this.state.stations}
                        openStationPopUp={this.openStationPopUp}
                        closeStationPopUp={this.closeStationPopUp}
                        selectStation={this.props.selectStation}
                    />
    				<ListComponent 
    					stations={this.state.stations} 
    					filterStations={this.filterStations}
                        animateStation={this.animateStation}
                        unAnimateStation={this.unAnimateStation}
                        selectStation={this.props.selectStation}
    				/>
    			</div>
  			</div>
		);
	}

}

export default withTranslation()(MainComponent);
