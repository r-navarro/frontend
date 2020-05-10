import { API_START, API_END, } from '../helpers/apiMiddleware/actions';
import { LOGIN, LOGGED, LOGIN_FAILED, LOGEDOUT } from './actions';


export const loginReducer = (state = { error: false, data: {} }, action) => {
    switch (action.type) {
        case LOGGED:
            return {
                islogged: true,
                error: false,
                roles: action.roles
            };
        case LOGEDOUT:
            return {
                islogged: false,
                error: false,
                roles: []
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
                roles: []
            };
        default:
            return state;
    }
}