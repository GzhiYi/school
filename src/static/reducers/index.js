import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import introduceReducer from './introduce';
import adminReducer from './admin';
import forumReducer from './forum';
import surroundingReducer from './surrounding';
export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    introduce: introduceReducer,
    admin: adminReducer,
    forum: forumReducer,
    surrounding: surroundingReducer,
    routing: routerReducer
});
