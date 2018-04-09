import {
    GET_ALL_QUICK_NEW_SUCCESS,
    GET_ALL_QUICK_NEW_REQUEST,
    GET_ALL_QUICK_NEW_FAILURE,

    ADD_QUICK_NEW_SUCCESS,
    ADD_QUICK_NEW_REQUEST,
    ADD_QUICK_NEW_FAILURE,

    GET_EAT_SUCCESS,
    GET_EAT_REQUEST,
    GET_EAT_FAILURE,

    ADD_EAT_SUCCESS,
    ADD_EAT_REQUEST,
    ADD_EAT_FAILURE

} from '../constants';

const initialState = {
    isGettingIntroduceBase: false
};

export default function surroundingReducer(state = initialState, action) {
    switch (action.type) {
        // 获取所有快讯数据
        case GET_ALL_QUICK_NEW_REQUEST:
            return Object.assign({}, state, {
                isFetchingQuickNew: true,
                statusText: null
            });

        case GET_ALL_QUICK_NEW_SUCCESS:
            return Object.assign({}, state, {
                isFetchingQuickNew: false,
                quickNew: action.payload.response,
            });

        case GET_ALL_QUICK_NEW_REQUEST:
            return Object.assign({}, state, {
                isFetchingQuickNew: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });
        
        // 新增一条快讯
        case ADD_QUICK_NEW_REQUEST:
            return Object.assign({}, state, {
                isAddingQuickNew: true,
                statusText: null
            });

        case ADD_QUICK_NEW_SUCCESS:
            return Object.assign({}, state, {
                isAddingQuickNew: false,
                addQuickNew: action.payload.response,
            });

        case ADD_QUICK_NEW_FAILURE:
            return Object.assign({}, state, {
                isAddingQuickNew: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        case GET_EAT_REQUEST:
            return Object.assign({}, state, {
                isFetchingEat: true,
                statusText: null
            });

        case GET_EAT_SUCCESS:
            return Object.assign({}, state, {
                isFetchingEat: false,
                eat: action.payload.response,
            });

        case GET_EAT_REQUEST:
            return Object.assign({}, state, {
                isFetchingEat: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        case ADD_EAT_REQUEST:
            return Object.assign({}, state, {
                isAddingEat: true,
                statusText: null
            });

        case ADD_EAT_SUCCESS:
            return Object.assign({}, state, {
                isAddingEat: false,
                addEat: action.payload.response,
            });

        case ADD_EAT_FAILURE:
            return Object.assign({}, state, {
                isAddingEat: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        default:
            return state;
    }
}

