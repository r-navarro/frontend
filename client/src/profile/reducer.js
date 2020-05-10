import { GET_USER } from './actions'

export const profileReducer = (state = {}, action) => {
    if (action.type === GET_USER) {
        return {
            data: action.data,
            success: action.success
        }
    } else {
        return state
    }
}