import { actionTypes } from '../../constants/actionType'
import { googleAuthProvider } from '../../config/fbConfig'
import { storage } from '../../config/fbConfig'
import { saveItem } from '../../services/localStorage.services'


export const loginWithGoogle = () =>{
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const firebase = getFirebase();
		firebase.auth().signInWithPopup(googleAuthProvider).then(res => {
			dispatch({type: actionTypes.LOGIN_SUCCESS})
			saveItem('account_status', 'LOGGED')
			const user = res.user;
			firestore.get({collection: 'user', where: [['email', '==', user.email]]}).then((data) => {
				if(!data.docs.length){
					firestore.collection('user').add({
						display_name: user.displayName,
						username: user.displayName,
						photoURL: user.photoURL,
						email: user.email,
						phoneNumber: user.phoneNumber,
						status: 'offline',
						UID: user.W.O
					})
				}
			})
		}).catch(e => {
			dispatch({type: actionTypes.LOGIN_ERROR})
		})
		
	}
}


export const logout = (redirectCallback) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    let uid = firebase.auth().O
    firebase.auth().signOut().then(() => {
      saveItem('account_status', 'UNLOGGED')
      dispatch({type: actionTypes.LOGOUT})

      var userLastConnectedRef = firebase.database().ref("lastOnline/" + uid)
      userLastConnectedRef.set({endAt: firebase.database.ServerValue.TIMESTAMP})
    }).then(() => {
      redirectCallback()
    })
  }
}