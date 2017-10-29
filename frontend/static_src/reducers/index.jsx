import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts';
import users from './users';
import UsersMenu from './UsersMenu';


export default combineReducers({
    routerReducer,
    posts,
    users,
    UsersMenu,
});