import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import '../App.css'
import GoogleButton from 'react-google-button' 

export const LoginPage = ({ firebase, auth }) => (
  <div className ="center-align">
  <button className="pink lighten-1 z-depth-g"><b><GoogleButton className="pink lighten-1 z-depth-g" 
  onClick={() => firebase.login({ provider: 'google', type: 'popup' })}/></b></button>
     <div>
      <h2>Auth</h2>
      {
        !isLoaded(auth)
        ? <span>Loading...</span>
        : isEmpty(auth)
          ? <span>Not Authed</span>
          : <pre>{JSON.stringify(auth, null, 2)}</pre>
      }
    </div>
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)