import React from 'react'
import { compose } from 'redux'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.autoAdjust = this.autoAdjust.bind(this);
  }

  componentDidMount() {
    if (this.props.autoAdjust && this.props.markers.length) {
      this.autoAdjust();
    }
  }

  autoAdjust() {
    var latlngbounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < this.props.markers.length; i++) {
        latlngbounds.extend(new window.google.maps.LatLng(this.props.markers[i].latitude, this.props.markers[i].longitude));
    }
    this.refs.map.fitBounds(latlngbounds);
  }

  render() {
    return (
      <GoogleMap
        ref='map'
        defaultZoom={this.props.zoom}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {this.props.markers.map(marker => (
            <Marker
              key={marker.id}
              onClick={() => {
                if (this.props.openStationPopUp) {
                  this.props.openStationPopUp(marker.id)
                }
              }}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              animation={marker.animation ? window.google.maps.Animation.BOUNCE: ''}
            >
                {marker.openPopUp && <InfoWindow 
                  position={{lat: marker.latitude, lng: marker.longitude}}
                  onCloseClick={() => this.props.closeStationPopUp(marker.id)}>
                  <div>
                    <h6>
                      <Link className="station-link" to="/station" 
                      onClick={() => {
                        this.props.closeStationPopUp(marker.id)
                        this.props.selectStation(marker.id, marker.user)
                      }}>
                        <div className="station-item-header">
                          <i className="fas fa-map-marker"></i>
                          <span>{(marker.location ? marker.location : '-')}</span>
                        </div>
                      </Link>
                    </h6>
                    <p>{this.props.t('Temperature')}: {(marker.temperature ? marker.temperature : '-') + 'ºC'}</p>
                    <p>{this.props.t('Humidity')}: {(marker.humidity ? marker.humidity : '-') + '%'}</p>
                    <p>{this.props.t('Pressure')}: {(marker.pressure ? marker.pressure : '-') + 'mBa'}</p>
                  </div>
                </InfoWindow>}
            </Marker>
          ))}
        </MarkerClusterer>
      </GoogleMap>
    )
  }

}

const MapElement = compose(
  withScriptjs,
  withGoogleMap
)(Map)

export default withTranslation()(MapElement);
