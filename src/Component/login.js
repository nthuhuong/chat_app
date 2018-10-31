import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import '../App.css'
// import GoogleButton from 'react-google-button' // optional

export const LoginPage = ({ firebase, auth }) => (
  <div>
     <nav class="navbar navbar-default" role="navigation">
       <div class="container-fluid">
         <div class="navbar-header">
           <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
           </button>
           <a class="navbar-brand" href="#"></a>
         </div>
    
         <div class="collapse navbar-collapse navbar-ex1-collapse">
           <ul class="nav navbar-nav">
           </ul>
           <ul class="nav navbar-nav navbar-right">
             
             <li class="dropdown">
               
                <button  type="submit" class="btn btn-default" 
                onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
                ><b class = "login">LOG IN</b></button>
      

             </li>
           </ul>
         </div>
       </div>
     </nav>

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