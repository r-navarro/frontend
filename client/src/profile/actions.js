import { apiAction } from '../helpers/apiMiddleware/actions'
import { URL } from '../helpers/config'

export const GET_USER = 'GET_USER'
export const CREATE_USER = 'CREATE_USER'


const URL_PREFIX = `${URL}/users`;

export const getUser = () => {
    return apiAction({
        url: `${URL_PREFIX}/me`,
        method: 'GET',
        accessToken: localStorage.getItem('accesToken'),
        onSuccess: getUserSuccess(),
        onFailure: failure(GET_USER)
    })
}

export const createUser = (user) => {
    return apiAction({
        url: `${URL_PREFIX}`,
        method: 'POST',
        data: user,
        label: CREATE_USER,
        accessToken: localStorage.getItem('accesToken'),
        onSuccess: createUserSuccess(),
        onFailure: failure(CREATE_USER)
    })
}

const getUserSuccess = () => (data) => {
    return {
        user: data,
        type: GET_USER,
        success: true
    }
}

const createUserSuccess = () => (data) => {
    return {
        createdUser: data,
        type: CREATE_USER,
        success: true
    }
}

const failure = (type) => (data) => {
    return {
        failedPayload: data,
        type,
        success: false
    }
}
