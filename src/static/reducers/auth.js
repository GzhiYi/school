import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGOUT_USER,

    AUTH_REGISTER_USER_REQUEST,
    AUTH_REGISTER_USER_SUCCESS,
    AUTH_REGISTER_USER_FAILURE
} from '../constants';


const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            });

        case AUTH_LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                auth: action.payload.response,
                statusText: 'You have been successfully logged in.'
            });

        case AUTH_LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        case AUTH_LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                userName: null,
                statusText: 'You have been successfully logged out.'
            });

        case AUTH_REGISTER_USER_REQUEST:
            return Object.assign({}, state, {
                isRegistering: true,
                statusText: null
            });

        case AUTH_REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                isRegistering: false,
                registerResponse: action.payload.response,
            });

        case AUTH_REGISTER_USER_FAILURE:
            return Object.assign({}, state, {
                isRegistering: false,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        default:
            return state;
    }
}

