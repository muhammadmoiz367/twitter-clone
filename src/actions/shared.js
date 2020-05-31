import { getInitialData } from '../utils/api'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import { setAuthUser } from './authUsers'
import {showLoading,hideLoading} from 'react-redux-loading'

const AUTH_ID='dan_abramov'

export function handleInitialData(){
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
        .then(({tweets,users})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveTweets(tweets))
            dispatch(setAuthUser(AUTH_ID))
            dispatch(hideLoading())
        })
    }
}