import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import introduceReducer from './introduce';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    introduce: introduceReducer,
    routing: routerReducer
});
