import { getInitialData } from '../utils/api'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import { setAuthUser } from './authUsers'
import { setProgressBar } from './progressBar'


const AUTH_ID='dan_abramov'

export function handleInitialData(){
    return (dispatch)=>{
        dispatch(setProgressBar('OPEN'))
        return getInitialData()
        .then(({tweets,users})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveTweets(tweets))
            dispatch(setAuthUser(AUTH_ID))
            dispatch(setProgressBar('CLOSE'))
        })
    }
}