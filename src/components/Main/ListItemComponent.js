import React from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';

class ListItemComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to="/station" style={{ textDecoration: 'none' }} onClick={() => this.props.selectStation(this.props.station.id, this.props.station.user)}>
              <div className="station-item" 
                  onMouseEnter={() => this.props.animateStation(this.props.station.id)}
                  onMouseLeave={() => this.props.unAnimateStation(this.props.station.id)}>
                  <div className="station-item-element">
                    <div className="station-item-header">
                      <i className="fas fa-map-marker"></i>
                      <span>{this.props.station.location}</span>
                    </div>
                    <div className="station-item-data">
                      <span className='station-item-element-data'>{(this.props.station.temperature ? this.props.station.temperature : '-') + 'ºC'}</span>
                      <span className='station-item-element-data'>{(this.props.station.humidity ? this.props.station.humidity : '-') + '%'}</span>
                      <span className='station-item-element-data'>{(this.props.station.pressure ? this.props.station.pressure : '-') + 'mBa'}</span>
                    </div>
                  </div>
              </div> 
            </Link>
        );
    } 
}

export default withTranslation()(ListItemComponent);
