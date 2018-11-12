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
//import ClickOutside from '../clickoutside/ClickOutSide'
import SlickLightbox from '../slicklightbox/SlickLightbox'
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

  handleOnSubmit(){
    if((this.state.content || this.state.files.length) && this.props.match.params && this.props.match.params.id){
      let sendmessage = this.state.content.replace(/(\r\n|\n)/g, '<br/>')
      this.props.sendMessage(
        {messages: this.state.messages, content: transferToImage(sendmessage), files: this.state.files, infoUser: this.props.infoUser},
        () => {this.scrollToBottom()}
      )
      this.setState({
        files: [],
        content: ''
      })
    }
  }

  handleKeyPress(event){
    if(event.key === 'Enter' && !event.altKey && this.props.match.params && this.props.match.params.id){
      event.preventDefault();
      event.target.value = ""
      this.handleOnSubmit()
    } else if (event.key === 'Enter' && !event.altKey && this.props.match && !this.props.match.params.id){
      event.preventDefault();
      event.target.value = ""
    }
    else if(event.key === 'Enter' && event.altKey){
      event.target.value += "\n"
    }
  }


  handleContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }



  render() {
    const {profile} = this.props
    const uid = profile.uid ? profile.uid : profile.UID
    const display_name = profile.display_name ? profile.display_name : profile.displayName
    return (
        <div className = {styles.chatbox}>
            <div className={this.props.showSidebar ? "d-none" : "chat" }>
                <div className="chat-header clearfix"></div>  
                <div className="chat-history" id="box-chat">
                    <ul>
                        {!!this.state.messages.length && this.state.messages.map((item, key) =>{
                                if(!(item.content || (item.images && item.images.length))){
                                    return null
                                }
                                return(
                                    <li className={uid === item.belongTo ? "clearfix" : ""} key={key}>
                                        <div className={uid === item.belongTo ? "message-data align-right" : "message-data"}>
                                           {uid === item.belongTo ?
                                                <div>
                                                    <span className="message-data-time" data-tip={formatDate(item.chatAt, "DD/MM/YYYY, hh:mm A")}>
                                                      {formatDate(item.chatAt, "hh:mm A, dddd")}
                                                    </span> &nbsp; &nbsp;
                                                    <ReactTooltip />
                                                    <span className="message-data-name">{uid === item.belongTo ? display_name : this.props.infoUser.name}</span> &nbsp;
                                                    <span className={uid === item.belongTo ? "circle me" : "circle other"}/>
                                                  </div>
                                                  :
                                                  <div>
                                                    <span className="message-data-name">
                                                      <span className={uid === item.belongTo ? "circle me" : "circle other"}/>
                                                      {uid === item.belongTo ? display_name : this.props.infoUser.name}
                                                    </span>
                                                    <span className="message-data-time" data-tip={formatDate(item.chatAt, "DD/MM/YYYY, hh:mm A")}>
                                                      {formatDate(item.chatAt, "hh:mm A, dddd")}
                                                    </span> &nbsp; &nbsp;
                                                    <ReactTooltip />
                                                </div>
                                           } 
                                        </div>
                                        <div className={uid === item.belongTo ? "message my-message float-right" : "message other-message"}>
                                            {item.content ?
                                                <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                                : null
                                            }
                                            {item.images && !!item.images.length && item.images.length > 1 &&
                                                <SlickLightbox images={item.images} />
                                            }
                                            {item.images && item.images.length === 1 &&
                                                <p>
                                                    <img src={item.images[0]} alt="message-img" style={{height: '200px', width: '200px'}}/>
                                                </p>
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>  
                </div>
                <div className="chat-message clearfix">
                    <form onSubmit={this.handleOnSubmit.bind(this)}>
                        <textarea name="message-to-send" id="message-to-send" placeholder="Nhập tin nhắn" rows={3}
                        value={this.state.content} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleContentChange.bind(this)}/>
                        <span className="media">
                            <div className="image-box">
                                <div className="preview-box">
                                    {this.state.files && this.state.files.map((item, key) => {
                                        return(
                                          <div className="tag" key={key}>
                                            <button type="button" className="close-x" onClick={this.handleRemoveImage.bind(this, key)}>
                                              <span>X</span>
                                            </button>
                                            <p>{item.name}</p>
                                          </div>
                                        )
                                      })
                                    }
                                </div>
                            </div>
                            <button type="button" className="btn-send d-sm-block d-none" onClick={this.handleOnSubmit.bind(this)}>
                                <Icon icon={send} size={24} style={{background: 'transparent !important', color: '#4EBDEB'}}/>
                            </button>
                        </span>
                    </form>
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

const mapDispatchToProps = (dispatch) => {
  return{
    logout: (redirectCallback) => dispatch(logout(redirectCallback)),
    sendMessage: (data, callback) => dispatch(sendMessage(data, callback))
  }
}

export default withRouter(
  compose(
    withFirestore,
    connect(mapStateToProps , mapDispatchToProps)
  )(ChatApp)
);
