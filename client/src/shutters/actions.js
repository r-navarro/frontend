import { apiAction } from '../helpers/apiMiddleware/actions';
import { URL } from '../helpers/config';

export const CLOSE = 'CLOSE';
export const OPEN = 'OPEN';
export const FAILED = 'FAILED';
export const SUCCESS = 'SUCCESS';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const URL_PREFIX = `${URL}/shutters`;

export const open = (id) => {
    return apiAction({
        url: `${URL_PREFIX}/open/${id}`,
        label: OPEN,
        accessToken: localStorage.getItem('accesToken'),
        method: 'POST',
        onSuccess: success,
        onFailure: failed
    });
}

export const close = (id) => {
    return apiAction({
        url: `${URL_PREFIX}/close/${id}`,
        label: CLOSE,
        method: 'POST',
        accessToken: localStorage.getItem('accesToken'),
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