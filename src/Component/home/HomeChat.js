import React, { Component } from 'react';
import styles from './HomeChat.scss';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { saveItem, loadItem } from '../../services/localStorage.services'
import { accountStatus } from '../../constants/localStorage'
import UsersList from '../userlist/UserList'
import ChatApp  from '../chat/ChatApp'
import { updateStatus } from '../../store/actions/authActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const mapDispatchToProps = (dispatch) => {
  return{
    updateStatus: () => dispatch(updateStatus())
  }
}

const mapStateToProps = (state) => {
  return{}
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      showDropdown: false,
      showSidebar: false
    }
  }

 componentDidMount(){
    if(loadItem('account_status') === accountStatus.UNLOGGED){
      this.props.history.push('/login')
    }
    else{
      saveItem('account_status', accountStatus.LOGGED)
      document.body.style.overflow = 'hidden'
      this.props.updateStatus()
    }
  }

  handleToggleSidebar(){
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  render() {
    return (
      <div className={styles.homePage}>
        <div className="container-app clearfix">
          <UsersList showSidebar={this.state.showSidebar} toggleSidebar={this.handleToggleSidebar.bind(this)}/>
          <ChatApp showSidebar={this.state.showSidebar} toggleSidebar={this.handleToggleSidebar.bind(this)}/>
        </div>
        {/* end container */}
      </div>
    );
  }
}

export default withRouter(
  compose(
    firestoreConnect(['users', 'chatbox']),
    connect(mapStateToProps, mapDispatchToProps)
  )(Home)
);
