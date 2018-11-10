import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import './index.css';
import App from './App';
import rootReducer from './store/reducers/rootReducer.js'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'


const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
);


const rrfConfig = {
  userProfile: 'users',
  enableLogging: false, 
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), 
)(createStore)


//const rootReducer = combineReducers({
 // firebase: firebaseReducer,
//})

const initialState = {}
//const store = createStoreWithFirebase(rootReducer, initialState)


ReactDOM.render(
	<Provider store = { store }>
		<App />
	</Provider>,
    document.getElementById('root')
);