import { actionTypes } from '../../constants/actionType'

const initState = {
	infoUser: null
}


const chatReducer = (state =  initState, action) => {
	switch(action.type){
		case actionTypes.INFO_CHAT_USER:
			return{
				...state,
				infoUser: action.info
		}
		default:
			return state;
	}
}


export default chatReducer