import { GET_USER, CREATE_USER } from './actions'
import { API_START, API_END, } from '../helpers/apiMiddleware/actions';

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                user: action.user,
                success: action.success
            }
        case CREATE_USER:
            console.log(action.failedPayload);
            return {
                ...state,
                createdUser: action.data,
                failedPayload: action.failedPayload,
                success: action.success
            }
        case API_START:
            if (action.payload === CREATE_USER) {
                return {
                    ...state,
                    isLoadingData: true
                };
            }
            return state;
        case API_END:
            if (action.payload === CREATE_USER) {
                return {
                    ...state,
                    isLoadingData: false
                };
            }
            return state;
        default:
            return state
    }
}