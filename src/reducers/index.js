import { combineReducers } from 'redux'
import tweets from './tweets'
import users from './users'
import authUsers from './authUsers'
import auth from './auth'
import ui from './ui'
import {firebaseReducer} from 'react-redux-firebase'

export default combineReducers({
    tweets,
    users,
    authUsers,
    auth,
    ui,
    firebase:firebaseReducer,
    
})