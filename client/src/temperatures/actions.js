import { apiAction } from '../helpers/apiMiddleware/actions';
import { URL } from '../helpers/config';

export const GET_DATA = 'GET_DATA';
export const FAILED = 'FAILED';
export const SUCCESS = 'SUCCESS';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const URL_PREFIX = `${URL}/rooms`;

export const getData = (id) => {
    return apiAction({
        url: `${URL_PREFIX}/${id}`,
        label: GET_DATA,
        accessToken: localStorage.getItem('accesToken'),
        method: 'GET',
        onSuccess: success,
        onFailure: failed
    });
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
}

const success = (data) => {
    return {
        data,
        type: SUCCESS
    }
}

const failed = (data) => {
    return {
        data: data,
        type: FAILED
    }
}