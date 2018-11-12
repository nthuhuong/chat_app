import React, { Component } from 'react'
import '../../App.css'
import { withRouter } from 'react-router'
//import LoginPage from '../../Component/login'
import { loadItem } from '../../services/localStorage.services'
import PropTypes from 'prop-types'
//import { compose } from 'redux'
import { connect } from 'react-redux'
//import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import GoogleButton from 'react-google-button' 
import { loginWithGoogle } from '../../store/actions/authActions'
import { accountStatus } from '../../constants/localStorage'
import { Redirect } from 'react-router-dom'


class SignIn extends Component{

	static propTypes = {
		auth_status: PropTypes.string,
		notLogged: PropTypes.bool,
		loginWithUsername: PropTypes.func,
		changeStatus: PropTypes.func
	}

	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			isSubmit: false
		}
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.id]: e.target.value

		})
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		console.log(this.state);

	}


	handleGoogleLogin(){
		this.props.loginWithGoogle()
	}	


	render(){
		if(loadItem('account_status') === accountStatus.LOGGED){
			return <Redirect to = '/homechat' />
		}
		return(

			<div className="container">
			
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Sign In</h5>
					<div className="imput-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="username" onChange={this.handleChange}/>
					</div>
					<div className="imput-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange}/>
					</div>

					<div className="imput-field center-align">
						 <button className="waves-effect waves-light btn-small pink lighten-1 z-depth-g singin"><b>Longin</b></button>
					</div>
					<br/>
					<div className ="center-align">
						<button className="pink lighten-1 z-depth-g"><b><GoogleButton className="pink lighten-1 z-depth-g" 
						onClick={this.handleGoogleLogin.bind(this)}/></b></button>
					</div>
				</form>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return{
		loginWithGoogle: () => dispatch(loginWithGoogle())
	}
}

const mapStateToProps = (state) => {
  return{
    auth_status: state.auth.auth_status,
    notLogged: state.firebase.auth.isEmpty
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));