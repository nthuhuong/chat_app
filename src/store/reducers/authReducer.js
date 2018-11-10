import { actionTypes } from '../../constants/actionType'

const initState = {
	auth_status: null,
}


const authReducer = (state =  initState, action) => {
	switch(action.type){
		case actionTypes.LOGIN_ERROR:
			return{
				...state,
				auth_status: 'failed'
			}
		case actionTypes.LOGIN_SUCCESS:
			return{
				...state,
				auth_status: 'success'
			}
		case actionTypes.LOGOUT:
            return{
            	...state,
            	auth_status: 'out'
            }
        case actionTypes.CHANGE_STATUS:
            return{
            	...state,
            	auth_status: action.status
            }
        default:
            return state
	}
}


export default authReducer