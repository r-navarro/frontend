import { API } from '../helpers/apiMiddleware/actions';
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
        onSuccess: success,
        onFailure: failed
    });
}

export const close = (id) => {
    return apiAction({
        url: `${URL_PREFIX}/close/${id}`,
        label: CLOSE,
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
    console.log(data.response)
    return {
        data: data,
        type: FAILED
    }
}

const apiAction = ({
    url = "",
    method = "POST",
    data = null,
    accessToken = localStorage.getItem('accesToken'),
    onSuccess = () => { },
    onFailure = () => { },
    label = "",
    headersOverride = null
}) => {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            accessToken,
            onSuccess,
            onFailure,
            label,
            headersOverride
        }
    };
}