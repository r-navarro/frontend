import { API_START, API_END, } from '../helpers/apiMiddleware/actions';
import { LOGIN, LOGGED, LOGIN_FAILED } from './actions';


export const loginReducer = (state = { error: false, data: {} }, action) => {
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
            return state;
        case API_END:
            if (action.payload === LOGIN) {
                return {
                    ...state,
                    isLoadingData: false
                };
            }
            return state;
        case LOGIN_FAILED:
            return {
                islogged: false,
                error: true,
                data: action.data,
            };
        default:
            return state;
    }
}