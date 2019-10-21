import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header'
import MainComponent from './Main/MainComponent'
import UserComponent from './User/UserComponent'
import StationComponent from './Station/StationComponent'
import Footer from './Footer'
import Login from './Auth/Login'
import Register from './Auth/Register'
import ConfirmationModal from './Modals/ConfirmationModal'
import FormModal from './Modals/FormModal'
import Spinner from './Spinner'
import * as apiUser from '../api/User'
import * as apiStations from '../api/Stations'
import * as apiStation from '../api/Station'
import * as apiPredictions from '../api/Predictions'

const mapStateToProps = (state, ownProps) => ({
  stations: state.stations,
  filteredStations: state.filteredStations,
  station: state.station,
  user: state.user,
  session: state.session,
  spinner: state.spinner
})

class Root extends React.Component {

	constructor(props) {
    	super(props);
    	this.selectStation = this.selectStation.bind(this);
    	this.toggleConfirmationModalVisibility = this.toggleConfirmationModalVisibility.bind(this);
    	this.toggleFormModalVisibility = this.toggleFormModalVisibility.bind(this);
    	this.state = {
           station: this.props.station || {},
           confirmationModalVisible: false,
           confirmationModalMode: '',
           formModalVisible: false,
           formModalMode: ''
        }
    }

    componentWillMount() {

    	if (typeof sessionStorage.session !== "undefined") {
    		apiUser.setUserInfo(sessionStorage.session, false);
          	if (sessionStorage.userId !== undefined && sessionStorage.userId !== "undefined") {
          		console.log("PILLANDO SOLO LAS DEL USUARIO")
          		apiStations.getAllUserStations(sessionStorage.userId);
          	} else {
          		console.log("PILLANDO TODAS")
          		apiStations.getAllStations();
          	}
    	}
    	if (!this.props.station.id && sessionStorage.station !== undefined && sessionStorage.station !== 'undefined') {
    		const savedStation = JSON.parse(sessionStorage.station)
    		if (savedStation.user === 'external') {
    			apiPredictions.getPredictions(savedStation);
    		}
    		else {
    			apiStation.setSpecificStationInfo(savedStation.id);
    		}
    	}
    }

    selectStation(idStation, userId) {
    	let wholeStations = this.props.stations.concat(this.props.filteredStations);
    	if (userId === 'external') {
    		let station = wholeStations.find(function (station) {
	          	return station.id === idStation;
	       	})
    		apiPredictions.getPredictions(station);
    	}
    	else {
    		apiStation.setSpecificStationInfo(idStation)
    	}
    }

    toggleConfirmationModalVisibility(mode) {
    	this.setState({
    		confirmationModalVisible: !this.state.confirmationModalVisible,
    		confirmationModalMode: mode
    	});
    }

    toggleFormModalVisibility(mode) {
    	this.setState({
    		formModalVisible: !this.state.formModalVisible,
    		formModalMode: mode
    	});
    }

    render() {
    	return ( 
		  	<div id='app'>
		  		<Router>
		  			<Route path="/(|login)/"
		 				component={() => 
		 					<div className="app">
		 						<Login session={this.props.session}/>
		 						<Spinner visible={this.props.spinner}/>
		 					</div>
		 				}
	 				/>
		  			<Route path='/register'
		 				component={() => 
							<div className="app">
		 						<Register session={this.props.session}/>
		 						<Spinner visible={this.props.spinner}/>
		 					</div>
						}
	 				/>
		 			<Route path='/home' exact
		 				component={() => 
		 					<div className="app">
			 					<Header 
			 						user={this.props.user}
			 						openLogoutModal={this.toggleConfirmationModalVisibility}
			 					/>
			 					<MainComponent
			 						session={this.props.session}
			 						stations={this.props.stations}
			 						filteredStations={this.props.filteredStations}
			 						selectStation={this.selectStation}
		 						/>
		 						<Footer />
		 						<ConfirmationModal 
		 							visible={this.state.confirmationModalVisible}
		 							mode={this.state.confirmationModalMode}
		 							closeConfirmationModal={this.toggleConfirmationModalVisibility}
		 						/>
		 						<Spinner visible={this.props.spinner}/>
	 						</div>
	 					}
	 				/>
		        	<Route path='/user' 
		        		component={() => 
		        			<div className="app">
		        				<Header 
		        					user={this.props.user}
		        					openLogoutModal={this.toggleConfirmationModalVisibility}
		        				/>
		        				<UserComponent 
		        					session={this.props.session}
		        					stations={this.props.stations} 
		        					user={this.props.user}
		        					selectStation={this.selectStation}
		        					openDeleteUserModal={this.toggleConfirmationModalVisibility}
		        					openEditUserModal={this.toggleFormModalVisibility}
		        					openNewStationModal={this.toggleFormModalVisibility}
		        				/>
		        				<Footer />
		        				<ConfirmationModal 
		 							visible={this.state.confirmationModalVisible}
		 							mode={this.state.confirmationModalMode}
		 							closeConfirmationModal={this.toggleConfirmationModalVisibility}
		 							user={this.props.user}
		 						/>
		 						<FormModal
		 							visible={this.state.formModalVisible}
		 							mode={this.state.formModalMode}
		 							closeFormModal={this.toggleFormModalVisibility}
		 							user={this.props.user}
		 						/>
		 						<Spinner visible={this.props.spinner}/>
		        			</div>
		        		} 
		        	/>
		        	<Route path='/station'
		        		component={() => 
		        			<div className="app">
			        			<Header 
			        				user={this.props.user}
			        				openLogoutModal={this.toggleConfirmationModalVisibility}
			        			/>
			        			<StationComponent
			        				session={this.props.session}
			        				station={this.props.station}
			        				user={this.props.user}
			        				openDeleteStationModal={this.toggleConfirmationModalVisibility}
			        				openEditStationModal={this.toggleFormModalVisibility}
			        			/>
			        			<Footer />
			        			<ConfirmationModal 
		 							visible={this.state.confirmationModalVisible}
		 							mode={this.state.confirmationModalMode}
		 							closeConfirmationModal={this.toggleConfirmationModalVisibility}
		 							user={this.props.user}
		 							station={this.props.station}
		 						/>
		 						<FormModal
		 							visible={this.state.formModalVisible}
		 							mode={this.state.formModalMode}
		 							closeFormModal={this.toggleFormModalVisibility}
		 							station={this.props.station}
		 						/>
		 						<Spinner visible={this.props.spinner}/>
		        			</div>
		        		}
		        	/>
		 		</Router>	
		  	</div>
		);
    }

}

export default connect(
  mapStateToProps
)(Root)
