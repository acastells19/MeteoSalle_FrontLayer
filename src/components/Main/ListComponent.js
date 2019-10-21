import React from 'react'
import ListItemComponent from './ListItemComponent'
import ListHeaderComponent from './ListHeaderComponent'
import { withTranslation } from 'react-i18next';

class ListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.getRenderStations = this.getRenderStations.bind(this);
    }

    getRenderStations() {
        let component = this;
        let orderedStations = this.props.stations.sort(function(a, b) {
            var locationA = a.location.toUpperCase();
            var locationB = b.location.toUpperCase();
            return (locationA < locationB) ? - 1 : (locationA > locationB) ? 1 : 0;
        });
        return orderedStations.map(function (station) {
            return <ListItemComponent 
                key={station.id}
                station={station} 
                animateStation={component.props.animateStation}
                unAnimateStation={component.props.unAnimateStation}
                selectStation={component.props.selectStation}
            />;
        });
    }

    render() {
        const renderStations = this.props.stations.length ? 
            this.getRenderStations() :
            <p id='no-list-items-message'>{this.props.t('NoStationsMessage')}</p>
        return (
            <div id='main-list' className="container col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
                <ListHeaderComponent filterStations={this.props.filterStations}/>
                <div id='list-wrapper'>
                    {renderStations}
                </div>
            </div>
        );
    } 
}

export default withTranslation()(ListComponent);
