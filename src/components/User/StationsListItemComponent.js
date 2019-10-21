import React from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';

class StationsListItemComponent extends React.Component {
	
	constructor(props) {
    	super(props);
    }

	render() {
		return (
			<div className='container stations-list-item col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6'>
			  	<h4>
			  		<Link className='station-link' to="/station" onClick={() => this.props.selectStation(this.props.station.id, this.props.station.user)}>
			  			<div className="station-item-header">
                <i className="fas fa-map-marker"></i>
                <span>{this.props.station.location}</span>
              </div>
			  		</Link>
			  	</h4>
			  	<table className="table station-table">
            <tbody>
              <tr>
                <th scope="col"><b>{this.props.t('Temperature')}</b></th>
                <th scope="col"><b>{this.props.t('Humidity')}</b></th>
                <th scope="col"><b>{this.props.t('Pressure')}</b></th>
              </tr>
              <tr>
                <td>{(this.props.station.temperature ? this.props.station.temperature : '-') + 'ºC'}</td>
                <td>{(this.props.station.humidity ? this.props.station.humidity : '-') + '%'}</td>
                <td>{(this.props.station.pressure ? this.props.station.pressure : '-') + 'mBa'}</td>
              </tr>
            </tbody>
				</table>
			</div>
		)
	}
	
}

export default withTranslation()(StationsListItemComponent);
