import {
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
    LIST_POSTS_REQUEST,

    LIST_TOP_POSTS_SUCCESS,
    LIST_TOP_POSTS_FAILURE,
    LIST_TOP_POSTS_REQUEST,

    LIST_COMMENTS_SUCCESS,
    LIST_COMMENTS_FAILURE,
    LIST_COMMENTS_REQUEST,

    ADD_COMMENTS_SUCCESS,
    ADD_COMMENTS_FAILURE,
    ADD_COMMENTS_REQUEST,

    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST

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

        // 列出置顶的帖子
        case LIST_TOP_POSTS_REQUEST:
            return Object.assign({}, state, {
                isFetchingTopPosts: true,
                statusText: null
            });

        case LIST_TOP_POSTS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingTopPosts: false,
                topPosts: action.payload.response,
            });
        case LIST_TOP_POSTS_FAILURE:
            return Object.assign({}, state, {
                isFetchingTopPosts: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 列出所有的帖子
        case LIST_COMMENTS_REQUEST:
            return Object.assign({}, state, {
                isFetchingComments: true,
                statusText: null
            });

        case LIST_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingComments: false,
                comments: action.payload.response,
            });

        case LIST_COMMENTS_FAILURE:
            return Object.assign({}, state, {
                isFetchingComments: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 发一个帖子
        case ADD_POST_REQUEST:
            return Object.assign({}, state, {
                isAddingPost: true,
                statusText: null
            });

        case ADD_POST_SUCCESS:
            return Object.assign({}, state, {
                isAddingPost: false,
                addPost: action.payload.response,
            });

        case ADD_POST_FAILURE:
            return Object.assign({}, state, {
                isAddingPost: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 新建评论
        case ADD_COMMENTS_REQUEST:
            return Object.assign({}, state, {
                isAddingComments: true,
                statusText: null
            });

        case ADD_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                isAddingComments: false,
                addComments: action.payload.response,
            });

        case ADD_COMMENTS_FAILURE:
            return Object.assign({}, state, {
                isAddingComments: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });
        default:
            return state;
    }
}

