import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST

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

        default:
            return state;
    }
}

