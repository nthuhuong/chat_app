import { actionTypes } from '../../constants/actionType'
import { googleAuthProvider } from '../../config/fbConfig'
import { storage } from '../../config/fbConfig'
import { saveItem } from '../../services/localStorage.services'
import {connectStringID} from '../../services/utils.services'


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


export const updateUserChatInfo = (data) => {
	return{
		type: actionTypes.INFO_CHAT_USER,
		info: data
	}
}


export const sendMessage = (data, callback) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore()
		const firebase = getFirebase()
		let uid = firebase.auth().O
		if(data.content || data.files.length){
			let arr = data.messages
			let date = new Date()
			let connectString = connectStringID(uid, data.infoUser.uid)
			let content = ""
			let tempImages = []
			if(data.content){
				content = data.content
			}
			if(data.files.length){
				let storageRef = storage.ref()
				let imagesStream = []
				data.files.forEach((item) => {
					let randomString = Math.random().toString(36).slice(2)
					let stream = storageRef.child(`images/${new Date().getTime() + '_' + randomString + '.' + item.type.replace('image/', '')}`).put(item, {contentType: 'image/*'})
					imagesStream.push(stream)
				})
				Promise.all(imagesStream).then((allRef) => {
					imagesStream = []
					allRef.forEach((item) =>{
						imagesStream.push(item.ref.getDownloadURL())
					})
				}).then(() => {
					Promise.all(imagesStream).then((allurls) => {
						arr.push({
							belongTo: uid,
							chatAt: date.toString(),
							content: content,
							images: allurls
						})
						firestore.get({collection: 'chatbox', where: ['id', '==', connectString]}).then((dataFirestore) =>{
							if(dataFirestore.docs.length){
								let id = dataFirestore.docs[0].id
								firestore.update({collection: 'chatbox', doc: id}, {lastChatAt: data.toString(), messages: arr}).then(() => {
									callback()
								})
							}
							else{
								firestore.collection('chatbox').doc(connectString).set({
									id: connectString,
									lastChatAt: data.toString(),
									messages: arr
								})
							}
						})
					})
				})
			}
			else{
				arr.push({
					belongTo: uid,
					chatAt: date.toString(),
					content: content,
					images: tempImages
				})
				firestore.get({collection: 'chatbox', where: ['id', '==', connectString]}).then((dataFirestore) => {
					if(dataFirestore.docs.length){
						let id = dataFirestore.docs[0].id
						firestore.update({collection: 'chatbox', doc: id}, {lastChatAt: date.toString(), messages: arr}).then(() =>{
							callback()
						})
					}
					else{
						firestore.collection('chatbox').doc(connectString).set({
							id: connectString,
							lastChatAt: data.toString(),
							messages: arr
						})
					}
				})
			}
		}
	}
}