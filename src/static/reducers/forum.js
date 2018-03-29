import {
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
    LIST_POSTS_REQUEST

} from '../constants';

const initialState = {
    isGettingIntroduceBase: false
};

export default function forumReducer(state = initialState, action) {
    switch (action.type) {
        // 列出所有的帖子
        case LIST_POSTS_REQUEST:
            return Object.assign({}, state, {
                isFetchingPosts: true,
                statusText: null
            });

        case LIST_POSTS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingPosts: false,
                posts: action.payload.response,
            });

        case LIST_POSTS_FAILURE:
            return Object.assign({}, state, {
                isFetchingPosts: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        default:
            return state;
    }
}

