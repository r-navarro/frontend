import { API_START } from '../helpers/apiMiddleware/actions';
import { OPEN, CLOSE, SUCCESS, FAILED, CLEAR_ERROR } from './actions';

export const shutterReducer = (state = { error: false, data: {} }, action) => {
    switch (action.type) {
        case API_START:
            if (action.payload === OPEN || action.payload === CLOSE) {
                return {
                    ...state,
                    isLoading: true,
                    error: false,
                    data: {}
                };
            }
            return state;
        case SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false,
                error: false,
            }
        case FAILED:
            return {
                ...state,
                data: action.data.response.data,
                isLoading: false,
                error: true,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: false,
            }
        default:
            return state;
    }
}