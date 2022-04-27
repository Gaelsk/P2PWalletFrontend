import { combineReducers } from 'redux';

import authReducer from "./auth"

// COMBINED REDUCERS
const reducers = {
    auth: authReducer
}

export default combineReducers(reducers)
