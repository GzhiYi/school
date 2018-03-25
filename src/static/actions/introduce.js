import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { 
    GET_INTRODUCE_BASE_SUCCESS,
    GET_INTRODUCE_BASE_FAILURE, 
    GET_INTRODUCE_BASE_REQUEST,

    GET_INTRODUCE_DETAIL_SUCCESS,
    GET_INTRODUCE_DETAIL_FAILURE,
    GET_INTRODUCE_DETAIL_REQUEST,

} from '../constants';
import { authLoginUserFailure } from './auth';


export function getIntroduceBaseSuccess(response) {
    return {
        type: GET_INTRODUCE_BASE_SUCCESS,
        payload: {
            response
        }
    };
}

export function getIntroduceBaseFailure(data) {
    return {
        type: GET_INTRODUCE_BASE_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function getIntroduceBaseRequest() {
    return {
        type: GET_INTRODUCE_BASE_REQUEST
    };
}

export function getIntroduceBase() {
    return (dispatch, state) => {
        dispatch(getIntroduceBaseRequest());
        return fetch(`${SERVER_URL}/api/v1/introduce/basic/`, {
            headers: {
                Accept: 'application/json',
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(getIntroduceBaseSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(getIntroduceBaseFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(getIntroduceBaseFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


export function getIntroduceDetailSuccess(response) {
    return {
        type: GET_INTRODUCE_DETAIL_SUCCESS,
        payload: {
            response
        }
    };
}

export function getIntroduceDetailFailure(error, message) {
    return {
        type: GET_INTRODUCE_DETAIL_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function getIntroduceDetailRequest() {
    return {
        type: GET_INTRODUCE_DETAIL_REQUEST
    };
}

export function getIntroduceDetail(type, callback) {
    return (dispatch, state) => {
        dispatch(getIntroduceDetailSuccess());
        return fetch(`${SERVER_URL}/api/v1/introduce/${type}/public/`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(getIntroduceDetailSuccess(response));
                callback(response)
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(getIntroduceDetailFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(getIntroduceDetailFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
