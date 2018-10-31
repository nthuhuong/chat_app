import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
	    apiKey: "AIzaSyD8Ke2IleGyrl3sm80KGxtRgGL8rTkcfZs",
        authDomain: "chat-app-firebase-1234.firebaseapp.com",
        databaseURL: "https://chat-app-firebase-1234.firebaseio.com",
        projectId: "chat-app-firebase-1234",
        storageBucket: "chat-app-firebase-1234.appspot.com",
        messagingSenderId: "488087434726"
}
firebase.initializeApp(firebaseConfig)

const rrfConfig = {
  userProfile: 'users',
  enableLogging: false, 
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), 
)(createStore)


const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)


ReactDOM.render(
	<Provider store = { store }>
		<App />
	</Provider>,
    document.getElementById('root')
);