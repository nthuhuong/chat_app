import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
//import styles from '../chat/ChatApp.scss'
import './Navbar.css'
import _ from 'lodash'
import { logout } from '../../store/actions/authActions'
import defaulAvatar from '../../images/default-avatar.png'
import {connectStringID} from '../../services/utils.services'

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
    const {profile} = this.props
    const uid = profile.uid ? profile.uid : profile.UID
    const display_name = profile.display_name ? profile.display_name : profile.displayName
		return(
			<ul className = "right">
			<li><NavLink to='/'>
				<div className>
				    <div className={this.props.showSidebar ? "d-none" : "chat" }>
		                <div className="chat-header clearfix">
			                <div className="current-user">
			                    <h3>{display_name}</h3>
			                    <img src={this.props.profile && this.props.profile.photoURL ? this.props.profile.photoURL : defaulAvatar} alt="avatar" />
			                </div>
		                </div>        
	                </div>
                </div>
				 
			</NavLink></li>
			<li><a onClick ={this.handleLogout.bind(this)}><b>Log Out</b></a></li>
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
  let chatData = _.values(state.firestore.data.chatbox)
  let tempProfile = state.firebase.profile && state.firebase.profile.isEmpty ? state.firebase.auth : state.firebase.profile
  let uid = tempProfile.uid ? tempProfile.uid : tempProfile.UID
  if(state.chat.infoUser){
    let stringID = connectStringID(uid, state.chat.infoUser.uid)
    chatData = chatData.filter((item) => {
      return item.id === stringID
    })
    if(chatData.length){
      chatData = chatData[0]
    }
  }

  return{
    dataChat: chatData,
    infoUser: state.chat.infoUser,
    profile: tempProfile,
    auth_status: state.auth.auth_status,
    notLogged: state.firebase.auth.isEmpty
  }
}


export default withRouter (connect(mapStateToProps, mapDispatchToProps)(SignedInLink));