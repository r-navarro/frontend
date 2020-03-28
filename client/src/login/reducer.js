import { API_START, API_END, } from '../helpers/apiMiddleware/actions';
import { LOGIN, LOGGED, LOGIN_FAILED } from './actions';


export const loginReducer = (state = {error:false}, action) => {
    console.log("action type => ", action.type);
    switch (action.type) {
        case LOGGED:
            return {
                islogged: true,
                error: false,
            };
        case API_START:
            if (action.payload === LOGIN) {
                return {
                    ...state,
                    isLoadingData: true
                };
            }
            break;
        case API_END:
            if (action.payload === LOGIN) {
                return {
                    ...state,
                    isLoadingData: false
                };
            }
            break;
        case LOGIN_FAILED:
            console.log('login failed', state);
            return {
                islogged: false,
                error: true,
            };
        default:
            return state;
    }
}