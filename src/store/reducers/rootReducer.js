import authReducer from './authReducer.js'
import chatReducer from './chatReducer.js'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
});

export default rootReducer 