import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import message from 'antd/lib/message';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
    LIST_POSTS_REQUEST,

    LIST_COMMENTS_SUCCESS,
    LIST_COMMENTS_FAILURE,
    LIST_COMMENTS_REQUEST

} from '../constants';
import { authLoginUserFailure } from './auth';


// list所有帖子
export function listPostsSuccess(response) {
    return {
        type: LIST_POSTS_SUCCESS,
        payload: {
            response
        }
    };
}

export function listPostsFailure(error, message) {
    return {
        type: LIST_POSTS_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function listPostsRequest() {
    return {
        type: LIST_POSTS_REQUEST
    };
}

export function listPosts(postId=null) {
    let api = `${SERVER_URL}/api/v1/handler/posts/`;
    if (postId !== null) {
        api = `${SERVER_URL}/api/v1/handler/posts/${postId}/`
    }
    return (dispatch, state) => {
        dispatch(listPostsRequest());
        return fetch(api, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(listPostsSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listPostsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(listPostsFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


// list所有评论
export function listCommentsSuccess(response) {
    return {
        type: LIST_COMMENTS_SUCCESS,
        payload: {
            response
        }
    };
}

export function listCommentsFailure(error, message) {
    return {
        type: LIST_COMMENTS_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function listCommentsRequest() {
    return {
        type: LIST_COMMENTS_REQUEST
    };
}

export function listComments(postId) {
    return (dispatch, state) => {
        dispatch(listCommentsRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/comments/?id=${postId}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(listCommentsSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listCommentsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(listCommentsFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
