import React from 'react'
import { withTranslation } from 'react-i18next';

class ListHeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let input;
        return (
          <div id="main-stations-list-header">
            <form id="stations-list-header-form" onSubmit={e => {
              e.preventDefault();
              this.props.filterStations(input.value);
              input.value = '';
            }}>
              <input id='list-header-input' ref={node => input = node} placeholder={this.props.t('SearchByLocation')}/>
              <i id='search-icon' className="fas fa-search"></i>
            </form>
          </div>
        );
    } 
}

export default withTranslation()(ListHeaderComponent);
