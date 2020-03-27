import { API_START } from '../helpers/apiMiddleware/actions';
import { OPEN, CLOSE, OPEN_OK, CLOSE_OK, OPEN_KO, CLOSE_KO, CLEAR_ERROR } from './actions';

export const _shutterReducer = (state = {}, action) => {
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
        case OPEN_OK:
        case CLOSE_OK:
            return {
                ...state,
                data: action.data,
                isLoading: false,
                error: false,
            }
        case OPEN_KO:
        case CLOSE_KO:
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