import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import message from 'antd/lib/message';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    GET_ALL_QUICK_NEW_SUCCESS,
    GET_ALL_QUICK_NEW_REQUEST,
    GET_ALL_QUICK_NEW_FAILURE,

    ADD_QUICK_NEW_SUCCESS,
    ADD_QUICK_NEW_REQUEST,
    ADD_QUICK_NEW_FAILURE

} from '../constants';
import { authLoginUserFailure } from './auth';

// 获取所有快讯的数据
export function getAllQuickNewSuccess(response) {
    return {
        type: GET_ALL_QUICK_NEW_SUCCESS,
        payload: {
            response
        }
    };
}

export function getAllQuickNewFailure(error, message) {
    return {
        type: GET_ALL_QUICK_NEW_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function getAllQuickNewRequest() {
    return {
        type: GET_ALL_QUICK_NEW_REQUEST
    };
}

export function getAllQuickNew(page = 1) {
    return (dispatch, state) => {
        dispatch(getAllQuickNewRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/get_quick_new/?page=${page}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(getAllQuickNewSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(getAllQuickNewFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(getAllQuickNewFailure('Connection Error', error));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


// 新建一条快讯
export function addQuickNewSuccess(response) {
    return {
        type: ADD_QUICK_NEW_SUCCESS,
        payload: {
            response
        }
    };
}

export function addQuickNewFailure(error, message) {
    return {
        type: ADD_QUICK_NEW_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function addQuickNewRequest() {
    return {
        type: ADD_QUICK_NEW_REQUEST
    };
}

export function addQuickNew(token, data) {
    return (dispatch, state) => {
        dispatch(addQuickNewRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/quick_new/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(addQuickNewSuccess(response));
                dispatch(getAllQuickNew());
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(addQuickNewFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(addQuickNewFailure('Connection Error', error));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
