import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import message from 'antd/lib/message';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST

} from '../constants';
import { authLoginUserFailure } from './auth';

// 获取用户信息
export function getUsersSuccess(response) {
    return {
        type: GET_USERS_SUCCESS,
        payload: {
            response
        }
    };
}

export function getUsersFailure(error, message) {
    return {
        type: GET_USERS_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function getUsersRequest() {
    return {
        type: GET_USERS_REQUEST
    };
}

export function getUsers(token, name=null, page=1) {
    let api = `${SERVER_URL}/api/v1/handler/user/?page=${page}`;
    if (name !== null) {
        api = `${SERVER_URL}/api/v1/handler/user/?n=${name}`;
    }
    return (dispatch, state) => {
        dispatch(getUsersRequest());
        return fetch(api, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(getUsersSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(getUsersFailure(401, data.non_field_errors[0]));
                    });
                }else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(getUsersFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(getUsersFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
