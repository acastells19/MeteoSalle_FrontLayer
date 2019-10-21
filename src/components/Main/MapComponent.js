import React from 'react'
import MapElement from '../../utils/maps'
import * as config from '../../utils/config'
import { withTranslation } from 'react-i18next'

class MapComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='main-map' className="container col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <MapElement
                    autoAdjust={true}
                    openStationPopUp={this.props.openStationPopUp}
                    closeStationPopUp={this.props.closeStationPopUp}
                    selectStation={this.props.selectStation}
                    zoom={6}
                    lat={39.9484042}
                    lng={-1.6175412}
                    markers={this.props.stations}
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + config.params.googleKey + "&language=" + this.props.t('Language')}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    } 
}

export default withTranslation()(MapComponent);
