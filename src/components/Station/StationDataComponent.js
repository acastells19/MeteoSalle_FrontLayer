import React from 'react'
import { Chart } from "react-google-charts"
import { withTranslation } from 'react-i18next';
import * as array from '../../utils/array'

class StationDataComponent extends React.Component {

	constructor(props) {
    	super(props);
    	this.setHistoric = this.setHistoric.bind(this);
    	this.setPredictions = this.setPredictions.bind(this);
    	this.state = {
           chart: 'predictions',
        }
    }

    setHistoric() {
    	if (this.state.chart !== 'registers') {
    		this.setState({chart: 'registers'});
    	}
    }

    setPredictions() {
    	if (this.state.chart !== 'predictions') {
    		this.setState({chart: 'predictions'});
    	}
    }

    render() {
    	let dataSet = this.state.chart === 'registers' ? 
    		array.getArrayOf(this.props.data.registers) : 
    		array.getArrayOf(this.props.data.predictions);
    	let historicClassName = this.state.chart === 'registers' ? 'active' : 'inactive';
    	let predictionsClassName = this.state.chart === 'predictions' ? 'active' : 'inactive';
    	let chartData = [[{ type: 'date', label: 'Day' }, this.props.t('TemperatureChart'), this.props.t('HumidityChart'), this.props.t('PressureChart')]];
    	for (let i in dataSet) {
            if (dataSet[i].timeStamp) {
                chartData.push([
                    new Date(Number(dataSet[i].timeStamp) * 1000),
                    Number(dataSet[i].temp),
                    Number(dataSet[i].humidity),
                    Number(dataSet[i].presion)
                ]);   
            } else if (dataSet[i].timestamp) {
                chartData.push([
                    new Date(Number(dataSet[i].timestamp) * 1000),
                    Number(dataSet[i].temp),
                    Number(dataSet[i].humidity),
                    Number(dataSet[i].presion)
                ]);   
            }
    	}
    	let stationActionButtons = this.props.user.id === this.props.data.user ? (
    		<div id="station-data-header-buttons">
    			<button 
					id="add-register-button"
					onClick={() => this.props.openEditStationModal('add-register')}
					>
					{this.props.t('AddRegister')}
				</button>
			</div>
    	) : '';
        let date = this.props.t('Date');
        let value = this.props.t('Value');
    	return (
    		<div id='station-data-wrapper' className="container col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
    			<div id="station-data-header">
					<h3 id='station-data-title'>
						<div className="station-item-header">
                          <i className="fas fa-map-marker"></i>
                          <span>{this.props.data.location}</span>
                        </div>
					</h3>
					{stationActionButtons}
				</div>
				<div id="station-data-body" className="container">
					<div id="station-tables" className="row">
					  	<table className="container table station-table col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5">
							<tbody>
							  	<tr>
			                      <th scope="col"><b>{this.props.t('Temperature')}</b></th>
			                      <th scope="col"><b>{this.props.t('Humidity')}</b></th>
			                      <th scope="col"><b>{this.props.t('Pressure')}</b></th>
			                    </tr>
			                    <tr>
			                      <td>{(this.props.data.temperature ? this.props.data.temperature : '-') + 'ºC'}</td>
			                      <td>{(this.props.data.humidity ? this.props.data.humidity : '-') + '%'}</td>
			                      <td>{(this.props.data.pressure ? this.props.data.pressure : '-') + 'mBa'}</td>
			                    </tr>
			                </tbody>
						</table>
					</div>
					<div id="station-charts">
						<div id="charts-selector">
							<a className={predictionsClassName} onClick={this.setPredictions}>{this.props.t('Predictions')}</a>
							<a className={historicClassName} onClick={this.setHistoric}>{this.props.t('Historic')}</a>
						</div>
						{
							chartData.length > 2 ? (
								<Chart
							      	chartType="LineChart"
							      	data={chartData}
							      	width="100%"
							      	height="400px"
							      	legendToggle
							      	options={{
									    hAxis: {
									      title: date,
									    },
									    vAxis: {
									      title: value,
									    },
									    pointSize: 5
									}}
							    />
							): <p id='no-chart-message'>{this.props.t('NoChartsData')}</p>
						}		
				    </div>
				</div>
			</div>
    	);
    }
  
}

export default withTranslation()(StationDataComponent);
