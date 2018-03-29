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
    SEARCH_ADMISSION_REQUEST

} from '../constants';

const initialState = {
    isGettingIntroduceBase: false
};

export default function forumReducer(state = initialState, action) {
    switch (action.type) {
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

        default:
            return state;
    }
}

