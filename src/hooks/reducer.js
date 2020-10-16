import {SET_CURRENT_USER} from '../services/login.action.js'
import isEmpty from '../components/ValidationEmpty.js'

export default function(state , action ){
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}
