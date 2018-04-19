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

const initialState = {
    isGettingIntroduceBase: false
};

export default function introduceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_INTRODUCE_BASE_REQUEST:
            return Object.assign({}, state, {
                isGettingIntroduceBase: true,
                statusText: null
            });

        case GET_INTRODUCE_BASE_SUCCESS:
            return Object.assign({}, state, {
                isGettingIntroduceBase: false,
                introduceBase: action.payload.response,
            });

        case GET_INTRODUCE_BASE_FAILURE:
            return Object.assign({}, state, {
                isGettingIntroduceBase: false,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        
        case GET_INTRODUCE_DETAIL_REQUEST:
            return Object.assign({}, state, {
                isGettingIntroduceBase: true,
                statusText: null
            });

        case GET_INTRODUCE_DETAIL_SUCCESS:
            return Object.assign({}, state, {
                isGettingIntroduceBase: false,
                introduceDetail: action.payload.response,
            });

        case GET_INTRODUCE_DETAIL_FAILURE:
            return Object.assign({}, state, {
                isGettingIntroduceBase: false,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        case UPDATE_INTRODUCE_DETAIL_REQUEST:
            return Object.assign({}, state, {
                isUpdateIntroduceDetail: true,
                statusText: null
            });

        case UPDATE_INTRODUCE_DETAIL_SUCCESS:
            return Object.assign({}, state, {
                isUpdateIntroduceDetail: false,
                updateIntroduceDetail: action.payload.response,
            });

        case UPDATE_INTRODUCE_DETAIL_FAILURE:
            return Object.assign({}, state, {
                isUpdateIntroduceDetail: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 查询录取结果
        case SEARCH_ADMISSION_REQUEST:
            return Object.assign({}, state, {
                isFetchingSearchAdmission: true,
                statusText: null
            });

        case SEARCH_ADMISSION_SUCCESS:
            return Object.assign({}, state, {
                isFetchingSearchAdmission: false,
                admissionResult: action.payload.response,
            });

        case SEARCH_ADMISSION_FAILURE:
            return Object.assign({}, state, {
                isFetchingSearchAdmission: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        // 查询录取结果
        case UPDATE_BASE_INTRODUCE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                statusText: null
            });

        case UPDATE_BASE_INTRODUCE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                introduceBaseResponse: action.payload.response,
            });

        case UPDATE_BASE_INTRODUCE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                statusText: `Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        default:
            return state;
    }
}

