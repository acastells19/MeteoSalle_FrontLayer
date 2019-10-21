import React from 'react'
import logo from '../../resources/img/logo_black.png';
import { Link, Redirect } from 'react-router-dom'
import * as apiAuth from '../../api/Auth';
import * as hash from '../../utils/hash'
import { withTranslation } from 'react-i18next';

class Login extends React.Component {

	 constructor(props) {
    	super(props);
    	this.state = {username: '', password: ''};

    	this.handleUsernameChange = this.handleUsernameChange.bind(this);
    	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

    handleUsernameChange(event) {
    	this.setState({username: event.target.value});
  	}

  	handlePasswordChange(event) {
    	this.setState({password: event.target.value});
  	}

  	handleSubmit(event) {
    	apiAuth.doLogin(this.state.username, this.state.password);
    	event.preventDefault();
  	}

  	renderRedirect() {
    	if (sessionStorage.token !== undefined && sessionStorage.token !== 'undefined') {
    		return (
    			<Redirect to='/home'/>
    		);	
    	}
    }

    render() {
    	let visibilityClassName = 'hidden';
    	if (sessionStorage.status > 0) {
    		visibilityClassName = 'redText'
    	}
    	else if (sessionStorage.status < 0) {
    		visibilityClassName = 'greenText'
    	}

    	let errorDisplayed = '';
    	if (sessionStorage.status == -1) {
    		errorDisplayed = 'UserCreated'
    	}
    	else if (sessionStorage.status == 1) {
    		errorDisplayed = 'ErrorLoginCredentials'
    	}
    	else if (sessionStorage.status == 2) {
    		errorDisplayed = 'ErrorLoginUser'
    	}
    	else if (sessionStorage.status == 3) {
    		errorDisplayed = 'ErrorLoginPw'
    	}
        else if (sessionStorage.status == 6) {
            errorDisplayed = 'ErrorLogin'
        }
        else if (sessionStorage.status == 7) {
            errorDisplayed = 'ErrorSession'
        }

    	return (
		  	<div id='login-page'>
		  		{this.renderRedirect()} 
		  		<div id='login-wrapper'>
			  		<form id='login-form' onSubmit={this.handleSubmit}>
			  			<div id='login-header'>
			  				<h3 id='login-title'>{this.props.t('Login')}</h3>
			  				<img id='login-logo' alt='Logo' src={logo}/>
			  			</div>
			  			
			  			<div className='login-form-line'>
			  				<label htmlFor='username'>{this.props.t('Username')}:</label>
			  				<input 
			  					id='username' 
			  					type='text'
			  					pattern="[a-zA-Z0-9]+" 
			  					title={this.props.t('UsernameRegex')}
			  					value={this.state.username} 
			  					onChange={this.handleUsernameChange} 
			  					placeholder={this.props.t('Username')}
			  					required/>
			  			</div>
			  			
			  			<div className='login-form-line'>
							<label htmlFor='password'>{this.props.t('Password')}:</label>
			  				<input 
			  					id='password' 
			  					type='password'
			  					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$"
			  					title={this.props.t('PasswordRegex')}
			  					value={this.state.password} 
			  					onChange={this.handlePasswordChange} 
			  					placeholder={this.props.t('Password')}
			  					required/>
			  			</div>

			  			<div id='login-form-error' className={visibilityClassName}>
			  				<p>{this.props.t(errorDisplayed)}</p>
			  			</div>

			  			<div className='login-form-buttons'>
			  				<button id='submit-button' type='submit'>{this.props.t('Login')}</button>
			  				<Link id='link-button' to="/register" onClick={() => sessionStorage.setItem("status", 0)}>
			  					{this.props.t('Register')}
			  				</Link>
			  			</div>
			  		</form>
		  		</div>
		  	</div>
		);
    }

}

export default withTranslation()(Login);
