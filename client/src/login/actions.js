import { API } from '../helpers/apiMiddleware/actions';
import { URL } from '../helpers/config';
import history from '../helpers/history'

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGGED = 'LOGGED';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';


export const login = (credentials) => {
    return apiAction({
        url: `${URL}/login`,
        method: 'POST',
        data: credentials,
        onSuccess: loginSuccess,
        onFailure: loginFailed,
        label: LOGIN
    });
}

export const refreshToken = () => {
    return apiAction({
        url: `${URL}/oauth/access_token`,
        method: 'POST',
        data: { grant_type: 'refresh_token', refresh_token: localStorage.getItem('refreshToken') },
        onSuccess: loginSuccess,
        onFailure: loginFailed,
    });
}

const loginSuccess = (data) => {
    localStorage.setItem('accesToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    history.push('/');
    return { type: LOGGED };
}

const loginFailed = (data) => {
    history.push('/login');
    return {
        type: LOGIN_FAILED,
        data
    };
}

const apiAction = ({
    url = "",
    method = "GET",
    data = null,
    accessToken = null,
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
