import React from 'react'
import logo from '../resources/img/spinner.gif';

class Spinner extends React.Component {

	constructor(props) {
    	super(props);
    }

	render() {
		let visibilityClassName = this.props.visible ? 'spinner-visible' : 'spinner-hidden';
		return (
			<div id='spinner-wrapper' className={visibilityClassName}>
				<img id='spinner-img' alt='Spinner' src={logo}/>
			</div>
		);
	}
  
}

export default Spinner
