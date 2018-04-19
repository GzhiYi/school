import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,

    DEL_USERS_SUCCESS,
    DEL_USERS_FAILURE,
    DEL_USERS_REQUEST,

    ADMIN_HANDLE_POST_SUCCESS,
    ADMIN_HANDLE_POST_REQUEST,
    ADMIN_HANDLE_POST_FAILURE


} from '../constants';

const initialState = {
    isGettingIntroduceBase: false
};

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        // 查询用户数据
        case GET_USERS_REQUEST:
            return Object.assign({}, state, {
                isFetchingUserData: true,
                statusText: null
            });

        case GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingUserData: false,
                userData: action.payload.response,
            });

        case GET_USERS_FAILURE:
            return Object.assign({}, state, {
                isFetchingUserData: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 删除用户数据
        case GET_USERS_REQUEST:
            return Object.assign({}, state, {
                isDeleteUserData: true,
                statusText: null
            });

        case GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                isDeleteUserData: false,
                delResponse: action.payload.response,
            });

        case GET_USERS_FAILURE:
            return Object.assign({}, state, {
                isDeleteUserData: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 更改帖子状态
        case ADMIN_HANDLE_POST_REQUEST:
            return Object.assign({}, state, {
                isAdminHandling: true,
                statusText: null
            });

        case ADMIN_HANDLE_POST_SUCCESS:
            return Object.assign({}, state, {
                isAdminHandling: false,
                handleResponse: action.payload.response,
            });

        case ADMIN_HANDLE_POST_FAILURE:
            return Object.assign({}, state, {
                isAdminHandling: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        default:
            return state;
    }
}

