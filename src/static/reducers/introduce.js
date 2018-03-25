import {
    GET_INTRODUCE_BASE_SUCCESS,
    GET_INTRODUCE_BASE_FAILURE,
    GET_INTRODUCE_BASE_REQUEST

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

        default:
            return state;
    }
}

