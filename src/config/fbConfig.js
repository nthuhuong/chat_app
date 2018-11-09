import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


var config = {
	    apiKey: "AIzaSyD8Ke2IleGyrl3sm80KGxtRgGL8rTkcfZs",
        authDomain: "chat-app-firebase-1234.firebaseapp.com",
        databaseURL: "https://chat-app-firebase-1234.firebaseio.com",
        projectId: "chat-app-firebase-1234",
        storageBucket: "chat-app-firebase-1234.appspot.com",
        messagingSenderId: "488087434726"
}
firebase.initializeApp(config); 
firebase.firestore().settings({ timestampsInSnapshots: true})

export default firebase; 
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();