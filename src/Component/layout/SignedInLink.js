import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'

class SignedInLink extends Component {

	constructor(props){
		super(props)
	}

	handleLogout(){
		this.props.logout(() => {
			this.props.history.push('/')
		})
	}

    render(){
		return(
			<ul className = "right">
			<li><a onClick ={this.handleLogout.bind(this)}>Log Out</a></li>
			<li><NavLink to='/' className='btn btn-floating pink lighten-1'>NN</NavLink></li>
			</ul>

		);
    }
	
}

const mapDispatchToProps = (dispatch) => {
	return{
		logout: (redirectCallback) => dispatch(logout(redirectCallback))

	}
}

const mapStateToProps = (state) => {
  return{
    auth_status: state.auth.auth_status,
    notLogged: state.firebase.auth.isEmpty
  }
}


export default withRouter (connect(mapStateToProps, mapDispatchToProps)(SignedInLink));