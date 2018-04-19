import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import message from 'antd/lib/message';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { authLogoutAndRedirect } from './auth';
import {
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
    LIST_POSTS_REQUEST,

    LIST_POSTS_ADMIN_SUCCESS,
    LIST_POSTS_ADMIN_FAILURE,
    LIST_POSTS_ADMIN_REQUEST,

    LIST_COMMENTS_SUCCESS,
    LIST_COMMENTS_FAILURE,
    LIST_COMMENTS_REQUEST,

    ADD_COMMENTS_SUCCESS,
    ADD_COMMENTS_FAILURE,
    ADD_COMMENTS_REQUEST,

    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,

    LIST_TOP_POSTS_SUCCESS,
    LIST_TOP_POSTS_FAILURE,
    LIST_TOP_POSTS_REQUEST,

    LIST_RECOMMENDED_POSTS_SUCCESS,
    LIST_RECOMMENDED_POSTS_FAILURE,
    LIST_RECOMMENDED_POSTS_REQUEST

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

export function listPosts(postId = null, authorId = null,  page = 1, callback) {
    let api = `${SERVER_URL}/api/v1/handler/posts/?page=${page}`;
    if (postId !== null) {
        api = `${SERVER_URL}/api/v1/handler/posts/?id=${postId}`
    }
    if (authorId !== null) {
        api = `${SERVER_URL}/api/v1/handler/posts/?au=${authorId}`
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
                callback(response)
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listPostsFailure(500, 'A server error occurred while sending your data!'));
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 404) {
                    // Most likely connection issues
                    dispatch(listPostsFailure('Connection Error', error));
                    message.warning("没有更多啦！")
                } else {
                    // Most likely connection issues
                    dispatch(listPostsFailure('Connection Error', error));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// list所有帖子-管理员
export function listPostsAdminSuccess(response) {
    return {
        type: LIST_POSTS_ADMIN_SUCCESS,
        payload: {
            response
        }
    };
}

export function listPostsAdminFailure(error, message) {
    return {
        type: LIST_POSTS_ADMIN_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function listPostsAdminRequest() {
    return {
        type: LIST_POSTS_ADMIN_REQUEST
    };
}

export function listPostsAdmin(postId = null, authorId = null, page = 1, callback) {
    let api = `${SERVER_URL}/api/v1/handler/posts_admin/?page=${page}`;
    if (postId !== null) {
        api = `${SERVER_URL}/api/v1/handler/posts_admin/?id=${postId}`
    }
    if (authorId !== null) {
        api = `${SERVER_URL}/api/v1/handler/posts_admin/?au=${authorId}`
    }
    return (dispatch, state) => {
        dispatch(listPostsAdminRequest());
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
                dispatch(listPostsAdminSuccess(response));
                callback(response)
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listPostsAdminFailure(500, 'A server error occurred while sending your data!'));
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 404) {
                    // Most likely connection issues
                    dispatch(listPostsAdminFailure('Connection Error', error));
                    message.warning("没有更多啦！")
                } else {
                    // Most likely connection issues
                    dispatch(listPostsAdminFailure('Connection Error', error));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


// list置顶帖子
export function listTopPostsSuccess(response) {
    return {
        type: LIST_TOP_POSTS_SUCCESS,
        payload: {
            response
        }
    };
}

export function listTopPostsFailure(error, message) {
    return {
        type: LIST_TOP_POSTS_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function listTopPostsRequest() {
    return {
        type: LIST_TOP_POSTS_REQUEST
    };
}

export function listTopPosts(postId = null) {
    return (dispatch, state) => {
        dispatch(listTopPostsRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/posts_top/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(listTopPostsSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listTopPostsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(listTopPostsFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
// list推荐帖子
export function listRecommendedPostsSuccess(response) {
    return {
        type: LIST_RECOMMENDED_POSTS_SUCCESS,
        payload: {
            response
        }
    };
}

export function listRecommendedPostsFailure(error, message) {
    return {
        type: LIST_RECOMMENDED_POSTS_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function listRecommendedPostsRequest() {
    return {
        type: LIST_RECOMMENDED_POSTS_REQUEST
    };
}

export function listRecommendedPosts(postId = null) {
    return (dispatch, state) => {
        dispatch(listRecommendedPostsRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/posts_recommended/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(listRecommendedPostsSuccess(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listRecommendedPostsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(listRecommendedPostsFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


// 发一个帖子
export function addPostSuccess(response) {
    return {
        type: ADD_POST_SUCCESS,
        payload: {
            response
        }
    };
}

export function addPostFailure(error, message) {
    return {
        type: ADD_POST_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function addPostRequest() {
    return {
        type: ADD_POST_REQUEST
    };
}

export function addPost(token, data) {
    return (dispatch, state) => {
        dispatch(addPostRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/add_post/`, {
            method: 'post',
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
                dispatch(addPostSuccess(response));
                message.success("发帖成功。")
                dispatch(push('/forum'));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    message.error("登录凭证过期，请重新登录。");
                    dispatch(authLogoutAndRedirect());
                }else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(addPostFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(addPostFailure('Connection Error', 'An error occurred while sending your data!'));
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

export function listComments(postId=null, authorId = null, page = 1, callback) {
    let api = `${SERVER_URL}/api/v1/handler/comments/?id=${postId}&page=${page}`;
    if (authorId !== null) {
        api = `${SERVER_URL}/api/v1/handler/comments/?au=${authorId}&page=${page}`;
    }
    return (dispatch, state) => {
        dispatch(listCommentsRequest());
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
                dispatch(listCommentsSuccess(response));
                callback(response);
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(listCommentsFailure(500, 'A server error occurred while sending your data!'));
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 404) {
                    // Most likely connection issues
                    dispatch(listCommentsFailure('Connection Error', error));
                    message.warning("没有更多啦！")
                } else {
                    // Most likely connection issues
                    dispatch(listCommentsFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// 新建评论
export function addCommentsSuccess(response) {
    return {
        type: ADD_COMMENTS_SUCCESS,
        payload: {
            response
        }
    };
}

export function addCommentsFailure(error, message) {
    return {
        type: ADD_COMMENTS_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function addCommentsRequest() {
    return {
        type: ADD_COMMENTS_REQUEST
    };
}

export function addComments(token, data, postId, callback) {
    return (dispatch, state) => {
        dispatch(addCommentsRequest());
        return fetch(`${SERVER_URL}/api/v1/handler/add_comments/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(addCommentsSuccess(response));
                message.success("评论成功！")
                callback(response)
                // dispatch(push(`/forum/detail/${postId}`))
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    message.error("登录凭证过期，请重新登录。");
                    dispatch(authLogoutAndRedirect());
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(addCommentsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(addCommentsFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

