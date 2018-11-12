import React, { Component } from 'react';
import styles from './ChatApp.scss'
//import styles from'./index.scss';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout, sendMessage } from '../../store/actions/authActions'
import { Icon } from 'react-icons-kit'
import {signOut, info, fileImageO, fileO, send, bars} from 'react-icons-kit/fa'
//import logo from '../../images/logoNav2.png'
import ClickOutside from '../clickoutside/ClickOutSide'
import {withFirestore} from 'react-redux-firebase'
import {compose} from 'redux'
import _ from 'lodash'
import {connectStringID, formatDate, transferToImage} from '../../services/utils.services'
import ReactTooltip from 'react-tooltip'



class ChatApp extends Component {

  static propTypes={
   profile: PropTypes.object,
  toggleSidebar: PropTypes.func,
   showSidebar: PropTypes.bool
  }

  constructor(props){
    super(props)
    const {dataChat} = this.props
    this.state = {
      showDropdown: false,
      messages: dataChat && dataChat.messages && !!dataChat.messages.length ? dataChat.messages : [],
      lastChat: dataChat && dataChat.lastChatAt ? dataChat.lastChatAt : null,
      content: "",
      originID: "",
      files: []
    }
  }

  handleCloseDropdown(){
    this.setState({
      showDropdown: false
    })
  }

  

   handleLogout(){
    this.props.logout(() => {
      this.props.history.push('/login')
    })
  }

  render() {
    const {profile} = this.props
    const uid = profile.uid ? profile.uid : profile.UID
    const display_name = profile.display_name ? profile.display_name : profile.displayName
    return (
        <div className = {styles.chatbox}>
            <div className={this.props.showSidebar ? "d-none" : "chat" }>
                <div className="chat-header clearfix">
                 
                </div>        
            </div>

        </div>
    );
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

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps , null)
  )(ChatApp)
);
