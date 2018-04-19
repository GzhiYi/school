import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import message from 'antd/lib/message';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { authLogoutAndRedirect } from './auth';
import { 
    GET_INTRODUCE_BASE_SUCCESS,
    GET_INTRODUCE_BASE_FAILURE, 
    GET_INTRODUCE_BASE_REQUEST,

    GET_INTRODUCE_DETAIL_SUCCESS,
    GET_INTRODUCE_DETAIL_FAILURE,
    GET_INTRODUCE_DETAIL_REQUEST,

    UPDATE_INTRODUCE_DETAIL_SUCCESS,
    UPDATE_INTRODUCE_DETAIL_FAILURE,
    UPDATE_INTRODUCE_DETAIL_REQUEST,

    SEARCH_ADMISSION_SUCCESS,
    SEARCH_ADMISSION_FAILURE,
    SEARCH_ADMISSION_REQUEST,

    UPDATE_BASE_INTRODUCE_SUCCESS,
    UPDATE_BASE_INTRODUCE_FAILURE,
    UPDATE_BASE_INTRODUCE_REQUEST

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


export function updateIntroduceDetailSuccess(response) {
    return {
        type: UPDATE_INTRODUCE_DETAIL_SUCCESS,
        payload: {
            response
        }
    };
}

export function updateIntroduceDetailFailure(error, message) {
    return {
        type: UPDATE_INTRODUCE_DETAIL_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function updateIntroduceDetailRequest() {
    return {
        type: UPDATE_INTRODUCE_DETAIL_REQUEST
    };
}

export function updateIntroduceDetail(token, type, data, callback) {
    return (dispatch, state) => {
        dispatch(updateIntroduceDetailRequest());
        return fetch(`${SERVER_URL}/api/v1/introduce/${type}/`, {
            method: 'post',
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
                message.success("更改成功，可到介绍页查看最新介绍内容。")
                dispatch(updateIntroduceDetailSuccess(response));
                callback(response)
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    message.error("登录凭证过期，请重新登录。");
                    dispatch(authLogoutAndRedirect());
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(updateIntroduceDetailFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(updateIntroduceDetailFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// 查询录取情况接口
export function searchAdmissionSuccess(response) {
    return {
        type: SEARCH_ADMISSION_SUCCESS,
        payload: {
            response
        }
    };
}

export function searchAdmissionFailure(error, message) {
    return {
        type: SEARCH_ADMISSION_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function searchAdmissionRequest() {
    return {
        type: SEARCH_ADMISSION_REQUEST
    };
}

export function searchAdmission(token, idNum) {
    return (dispatch, state) => {
        dispatch(searchAdmissionRequest());
        return fetch(`${SERVER_URL}/api/v1/admission/handler/?id=${idNum}`, {
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
                dispatch(searchAdmissionSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    message.error("登录凭证过期，请重新登录。");
                    dispatch(authLogoutAndRedirect());
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(searchAdmissionFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(searchAdmissionFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// 修改基本介绍信息接口
export function updateBaseIntroduceSuccess(response) {
    return {
        type: UPDATE_BASE_INTRODUCE_SUCCESS,
        payload: {
            response
        }
    };
}

export function updateBaseIntroduceFailure(error, message) {
    return {
        type: UPDATE_BASE_INTRODUCE_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function updateBaseIntroduceRequest() {
    return {
        type: UPDATE_BASE_INTRODUCE_REQUEST
    };
}

export function updateBaseIntroduce(token, data) {
    return (dispatch, state) => {
        dispatch(searchAdmissionRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/update_base/`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(data),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(updateBaseIntroduceSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    message.error("登录凭证过期，请重新登录。");
                    dispatch(authLogoutAndRedirect());
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(updateBaseIntroduceFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(updateBaseIntroduceFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
