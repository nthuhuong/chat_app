import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
// import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
//import firebase from 'firebase';
import './index.css';
import App from './App';
import rootReducer from './store/reducers/rootReducer.js'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import * as serviceWorker from './serviceWorker';


const rrfConfig = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  // sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}


const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, rrfConfig)
  )
);



//const createStoreWithFirebase = compose(
  //reactReduxFirebase(firebase, rrfConfig), 
//)(createStore)


//const rootReducer = combineReducers({
 // firebase: firebaseReducer,
//})

//const initialState = {}
//const store = createStoreWithFirebase(rootReducer, initialState)
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store = { store }>
            <App />
        </Provider>,
        document.getElementById('root')
    );
  serviceWorker.unregister();  
})

