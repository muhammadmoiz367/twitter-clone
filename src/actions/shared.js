import { getInitialData } from '../utils/api'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import { setAuthUser } from './authUsers'

const AUTH_ID='tylermcginnis'

export function handleInitialData(){
    return (dispatch)=>{
        return getInitialData()
        .then(({tweets,users})=>{
            dispatch(receiveTweets(tweets))
            dispatch(receiveUsers(users))
            dispatch(setAuthUser(AUTH_ID))
        })
    }
}