import { apiAction } from '../helpers/apiMiddleware/actions';
import { URL } from '../helpers/config';
import history from '../helpers/history';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGGED = 'LOGGED';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const LOGEDOUT = 'LOGEDOUT';


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

export const logout = () => {
    localStorage.removeItem('accesToken');
    localStorage.removeItem('refreshToken');
    history.push('/login');
    return { type: LOGEDOUT };
}

export const refreshToken = () => {
    return apiAction({
        url: `${URL}/oauth/access_token`,
        method: 'POST',
        data: { grant_type: 'refresh_token', refresh_token: localStorage.getItem('refreshToken') },
        onSuccess: refreshSuccess,
        onFailure: loginFailedSilent,
    });
}

const refreshSuccess = (data) => {
    localStorage.setItem('accesToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    return apiAction({
        url: `${URL}/users/me`,
        method: 'GET',
        accessToken: localStorage.getItem('accesToken'),
        onSuccess: (meData) => {
            history.push('/app');
            return { type: LOGGED, roles: meData.roles }
        },
        onFailure: loginFailedSilent,
    });
}

const loginSuccess = (data) => {
    localStorage.setItem('accesToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    history.push('/app');
    return { type: LOGGED, roles: data.roles };
}

const loginFailed = (data) => {
    history.push('/login');
    return {
        type: LOGIN_FAILED,
        data: data.response
    };
}

const loginFailedSilent = () => {
    history.push('/login');
    return {
        type: ''
    };
}
