import React from 'react'
import maleAvatar from '../../resources/img/male-avatar.png';
import femaleAvatar from '../../resources/img/female-avatar.png';
import noGenderAvatar from '../../resources/img/no-gender-avatar.png';
import { withTranslation } from 'react-i18next';

class UserInfoComponent extends React.Component {

	constructor(props) {
    	super(props);
    }

	render() {
		let avatar = noGenderAvatar;
		if (this.props.user.gender === 'male') {
			avatar = maleAvatar;
		}
		else if (this.props.user.gender === 'female') {
			avatar = femaleAvatar;
		}
		return (
			<div id='user-info' className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-4">
				<div id="user-profile-image">
			    	<img id='profile-image' alt='Avatar' src={avatar}/>
			    </div>
			    <div id="user-info-data">
				    <p className="user-info-line">
				    	<span className="user-info-line-title">{this.props.t('Name')}: </span>{this.props.user.username}
				    </p>
				    <p className="user-info-line">
				    	<span className="user-info-line-title">{this.props.t('Gender')}: </span>{this.props.t(this.props.user.gender)}
				    </p>
				    <p className="user-info-line">
				    	<span className="user-info-line-title">{this.props.t('Age')}: </span>{this.props.user.age}
				    </p>
			    </div>
			    <div id="user-info-actions">
			    	<button 
			    		className="general-button" 
			    		id="edit-user-button"
			    		onClick={() => this.props.openEditUserModal('edit-user')}
			    		>
			    		{this.props.t('Edit')}
			    	</button>
					<button 
						className="delete-button" 
						id="delete-user-button"
						onClick={() => this.props.openDeleteUserModal('user')}
						>
						{this.props.t('Delete')}
					</button>
			    </div>
			  </div>
		);
	}
  
}

export default withTranslation()(UserInfoComponent);
