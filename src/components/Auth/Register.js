import React from 'react'
import logo from '../../resources/img/logo_black.png';
import { Link, Redirect } from 'react-router-dom'
import * as apiAuth from '../../api/Auth';
import * as hash from '../../utils/hash'
import { withTranslation } from 'react-i18next';

class Register extends React.Component {

	constructor(props) {
    	super(props);

    	this.state = {username: '', password: '', passwordCheck: ''};

    	this.handleUsernameChange = this.handleUsernameChange.bind(this);
    	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    	this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
    	this.setState({username: event.target.value});
  	}

  	handlePasswordChange(event) {
    	this.setState({password: event.target.value});
  	}

  	handlePasswordCheckChange(event) {
  		this.setState({passwordCheck: event.target.value});
  	}

  	handleSubmit(event) {
    	if (this.state.password === this.state.passwordCheck) {
    		apiAuth.doRegister(this.state.username, this.state.password);
    	}
    	else {
    		sessionStorage.setItem("status", 5);
    		this.setState({username: this.state.username})
    	}
    	event.preventDefault();
    	
  	}

  	renderRedirect() {
    	if (parseInt(sessionStorage.status) < 0 && typeof sessionStorage.status !== "undefined") {
    		return (
    			<Redirect to='/login'/>
    		);	
    	}
    }

    render() {
    	let visibilityClassName = 'hidden';
    	if (sessionStorage.status > 0) {
    		visibilityClassName = 'redText'
    	}

    	let errorDisplayed = '';
    	if (sessionStorage.status == 4) {
    		errorDisplayed = 'ErrorRegisterUser'
    	}
    	else if (sessionStorage.status == 5) {
    		errorDisplayed = 'ErrorRegisterPw'
    	}
    	else if (sessionStorage.status === 6) {
    		errorDisplayed = 'ErrorRegister'
    	}

    	return (
		  	<div id='login-page'>
		  		{this.renderRedirect()} 
		  		<div id='login-wrapper'>
			  		<form id='login-form' onSubmit={this.handleSubmit}>
			  			<div id='login-header'>
			  				<h3 id='register-title'>{this.props.t('Register')}</h3>
			  				<img id='register-logo' alt='Logo' src={logo}/>
			  			</div>

			  			<div className='login-form-line'>
			  				<label htmlFor='username'>{this.props.t('Username')}:</label>
			  				<input 
			  					id='username' 
			  					type='text' 
			  					placeholder={this.props.t('Username')}
			  					pattern="[a-zA-Z0-9]+" 
			  					title={this.props.t('UsernameRegex')}
			  					value={this.state.username} 
			  					onChange={this.handleUsernameChange}  
			  					required/>
			  			</div>

			  			<div className='login-form-line'>
			  				<label htmlFor='password'>{this.props.t('Password')}:</label>
			  				<input 
			  					id='password' 
			  					type='password' 
			  					placeholder={this.props.t('Password')}
			  					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$"
			  					title={this.props.t('PasswordRegex')}
			  					value={this.state.password} 
			  					onChange={this.handlePasswordChange}  
			  					required/>
			  			</div>
			  			
			  			<div className='login-form-line'>
							<label htmlFor='password-again'>{this.props.t('PasswordAgain')}:</label>
			  				<input 
			  					id='password-again' 
			  					type='password' 
			  					placeholder={this.props.t('PasswordAgain')}
			  					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$"
			  					title={this.props.t('PasswordRegex')}
			  					value={this.state.passwordCheck} 
			  					onChange={this.handlePasswordCheckChange}  
			  					required/>
			  			</div>

			  			<div id='register-form-error' className={visibilityClassName}>
			  				<p>{this.props.t(errorDisplayed)}</p>
			  			</div>

			  			<div className='login-form-buttons'>
			  				<button id='submit-button' type='submit'>{this.props.t('Register')}</button>
			  				<Link id='link-button' to="/login" onClick={() => sessionStorage.setItem("status", 0)}>
			  					{this.props.t('Login')}
			  				</Link>
			  			</div>
			  		</form>
		  		</div>
		  	</div>
		);
    }

}

export default withTranslation()(Register);
