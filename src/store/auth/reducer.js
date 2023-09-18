import { ACCESS_TOKEN } from "../../constants";
import { ACT_LOGIN_SUCCESS, ACT_LOGOUT } from "./actions";

const initState = {
    token: localStorage.getItem(ACCESS_TOKEN),
    currentUser: null
}

function reducer(authState = initState, action) {
    switch (action.type) {
        case ACT_LOGIN_SUCCESS:
            return {
                currentUser: action.payload.user,
                token: action.payload.token
            }
        case ACT_LOGOUT: {
            localStorage.removeItem(ACCESS_TOKEN)
            return {
                ...authState,
                token: '',
                currentUser: null
            }
        }
        case ACCESS_TOKEN:
            localStorage.setItem(ACCESS_TOKEN, action.payload.token)
            return {
                ...authState,
                token: action.payload.token
            }
        default:
            return authState;
    }
}

export default reducer