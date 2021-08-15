/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { folderReducer } from './folderReducer';
import { loadingReducer } from './loadingReducer';
import { flashReducer } from './flashReducer';

export default combineReducers({
    authReducer,
    folderReducer,
    loadingReducer,
    flashReducer,
});
