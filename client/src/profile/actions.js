import { apiAction } from '../helpers/apiMiddleware/actions'
import { URL } from '../helpers/config'

export const GET_USER = 'GET_USER'


const URL_PREFIX = `${URL}/users`;

export const getUser = () => {
    return apiAction({
        url: `${URL_PREFIX}/me`,
        method: 'GET',
        accessToken: localStorage.getItem('accesToken'),
        onSuccess: after(true),
        onFailure: after(false)
    })
}

const after = (success) => (data) => {
    return {
        data,
        type: GET_USER,
        success
    }
}
