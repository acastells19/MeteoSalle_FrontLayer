import React from 'react'
import { withTranslation } from 'react-i18next';

class Footer extends React.Component {

	constructor(props) {
        super(props);
    }

    render() {
    	return (
    		<div id='footer'>
			    <nav id='footer-links'> 
                    <a    
                        id="vendor-link" 
                        className="footer-link" 
                        href="https://www.apixu.com/"
                        target="_blank"
                        hrefLang="en">
                        Apixu
                    </a>
                    <a 
                        id="vendor-link" 
                        className="footer-link" 
                        href="https://openweathermap.org/"
                        target="_blank"
                        hrefLang="en">
                        OpenWeather
                    </a>
                    <a 
                        id="vendor-link" 
                        className="footer-link" 
                        href="https://developer.here.com/documentation/weather/topics/overview.html"
                        target="_blank"
                        hrefLang="en">
                        Here
                    </a>
			        <a 
                        id="vendor-link" 
                        className="footer-link" 
                        href="https://www.salleurl.edu/en"
                        target="_blank"
                        hrefLang="en">
                        La Salle
                    </a>
			    </nav>
			</div>
    	);
    }
}

export default withTranslation()(Footer);
