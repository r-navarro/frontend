import { API_START } from '../helpers/apiMiddleware/actions';
import { GET_DATA, GET_ALL_DATA, SUCCESS, GET_ALL_DATA_SUCCESS, FAILED, CLEAR_ERROR } from './actions';

export const roomsReducer = (state = { error: false, data: {}, allData: [] }, action) => {
    switch (action.type) {
        case API_START:
            if (action.payload === GET_DATA || action.payload === GET_ALL_DATA) {
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
        case GET_ALL_DATA_SUCCESS:
            console.log(action.allData.map(data => ({ argument: new Date(data.timestamp * 1000), value: data.temperature })));
            return {
                ...state,
                allData: action.allData,
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