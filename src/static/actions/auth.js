import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER,

    AUTH_REGISTER_USER_REQUEST,
    AUTH_REGISTER_USER_SUCCESS,
    AUTH_REGISTER_USER_FAILURE,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
} from '../constants';
import message from 'antd/lib/message';


export function authLoginUserSuccess(response) {
    console.log(response);
    Cookies.set('user', response.user, { expires: 7 });
    Cookies.set('token', response.token, { expires: 7 })
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            response
        }
    };
}

export function authLoginUserFailure(error, message) {
    Cookies.remove('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function authLogout() {
    Cookies.remove('token');
    Cookies.remove('user');
    return {
        type: AUTH_LOGOUT_USER
    };
}

export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

export function authLoginUser(email, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${email}:${password}`);
        console.log(auth)
        return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authLoginUserSuccess(response));
                message.success("登陆成功！")
                dispatch(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        message.error("登陆失败，检查您的帐号和密码对不对。")
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function authRegisterUserSuccess(response) {
    return {
        type: AUTH_REGISTER_USER_SUCCESS,
        payload: {
            response
        }
    };
}

export function authRegisterUserFailure(error, message) {
    Cookies.remove('token');
    return {
        type: AUTH_REGISTER_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authRegisterUserRequest() {
    return {
        type: AUTH_REGISTER_USER_REQUEST
    };
}

export function authRegisterUser(email, password) {
    return (dispatch) => {
        dispatch(authRegisterUserRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authRegisterUserSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authRegisterUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authRegisterUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authRegisterUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// 更新个人资料
export function updateUserSuccess(response) {
    console.log(response.user, "查看返回");
    Cookies.remove('user');
    Cookies.set('user', response.user, { expires: 7 });
    return {
        type: UPDATE_USER_SUCCESS,
        payload: {
            response
        }
    };
}

export function updateUserFailure(error, message) {
    return {
        type: UPDATE_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function updateUserRequest() {
    return {
        type: UPDATE_USER_REQUEST
    };
}

export function updateUser(token, data) {
    return (dispatch, state) => {
        dispatch(updateUserRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/user_update/`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(updateUserSuccess(response));
                message.success("更新个人资料成功！")
                dispatch(getUser(token));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(updateUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(updateUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// 获取个人资料
export function getUserSuccess(response) {
    return {
        type: GET_USER_SUCCESS,
        payload: {
            response
        }
    };
}

export function getUserFailure(error, message) {
    return {
        type: GET_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function getUserRequest() {
    return {
        type: GET_USER_REQUEST
    };
}

export function getUser(token) {
    return (dispatch, state) => {
        dispatch(getUserRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/user_update/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(getUserSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(getUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(getUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
