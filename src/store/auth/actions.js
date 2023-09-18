import { ACCESS_TOKEN, MESSAGE_FORM_ERROR } from "../../constants"
import { mappingCurrentUser } from "../../helpers"
import { authService } from "../../service/auth"

export const ACT_LOGIN_SUCCESS = 'ACT_LOGIN_SUCCESS'
export const ACT_LOGOUT = 'ACT_LOGOUT'
export const ACT_SET_TOKEN = 'ACT_SET_TOKEN'

export function actSetToken(token) {
    return {
        type: ACCESS_TOKEN,
        payload: {
            token
        }
    }
}

export function actLoginAsync(username, password) {
    return async dispatch => {
        try {
            const response = await authService.login(username, password)
            const token = response.data.token
            dispatch(actSetToken(token))
            const responseMe = await dispatch(actFetchMeAsync(token))
            return {
                ok: responseMe.ok,
                error: responseMe.error
            }
        } catch (error) {
            return {
                ok: false,
                error: 'username hoặc password không hợp lệ'
            }
        }
    }
}

export function logOut() {
    return {
        type: ACT_LOGOUT
    }
}




export function actFetchMeAsync(token) {
    return async dispatch => {
        if (token === undefined) {
            token = localStorage.getItem(ACCESS_TOKEN)
        }
        try {
            const response = await authService.fetchMe()
            const user = mappingCurrentUser(response.data)
            dispatch(actLoginSuccess({ user, token }))
            return {
                ok: true
            }
        } catch (error) {
            dispatch(logOut())
            return {
                ok: false,
                error: 'username hoặc password không hợp lệ'
            }
        }
    }
}

export function actLoginSuccess({ user, token }) {
    return {
        type: ACT_LOGIN_SUCCESS,
        payload: {
            user,
            token
        }
    }
}

export function actRegisterAsync({
    email,
    username,
    password,
    nickname
}) {
    return async dispatch => {
        try {
            const response = await authService.register({
                email,
                username,
                password,
                nickname
            })
            const responseLogin = await dispatch(actLoginAsync(username, password))


            if (responseLogin.ok) {
                return {
                    ok: true
                }
            }

            throw new Error(MESSAGE_FORM_ERROR.default)

        } catch (error) {
            let errorMessage = MESSAGE_FORM_ERROR.default
            if (error.response && error.response.data && error.response.data.code) {
                const errorCode = error.response.data.code
                if (MESSAGE_FORM_ERROR[errorCode]) {
                    errorMessage = MESSAGE_FORM_ERROR[errorCode]
                }
            }
            return {
                ok: false,
                error: errorMessage
            }
        }
    }
}