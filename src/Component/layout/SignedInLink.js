import React from 'react'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'

const SignedInLink = (props) =>{

	/*handleLogout(){
		this.props.logout(() => {
			this.props.history.push('/')
		})
	}*/


	return(
		<ul className = "right">
			<li><a onClick ={props.logout()}>Log Out</a></li>
			<li><NavLink to='/' className='btn btn-floating pink lighten-1'>NN</NavLink></li>
		</ul>

	)
}

const mapDispatchToProps = (dispatch) => {
	return{
		logout: () => dispatch(logout())
	}
}


export default connect(null,mapDispatchToProps)(SignedInLink)