import {saveLikeToggle,saveTweet} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'
export const RECEIVE_TWEETS='RECEIVE_TWEETS'
export const TOGGLE_TWEET='TOGGLE_TWEET'
export const ADD_TWEET='ADD_TWEET'


export function receiveTweets(tweets){
    return{
        type:RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({id, authUsers, hasLiked}){
    return{
        type:TOGGLE_TWEET,
        id,
        authUsers,
        hasLiked
    }
}
function addTweet(tweet){
    return{
        type:ADD_TWEET,
        tweet
    }
}

export function handleToggleTweet(info){
    return (dispatch)=>{
        dispatch(toggleTweet(info))
        return saveLikeToggle(info)
        .catch((e)=>{
            console.warn('Error in handleToggleTweet: ',e)
            dispatch(toggleTweet(info))
            alert('There was an error toggling a tweet. Try again.')
        })
    }
}

export function handleAddTweet(text,replyingTo){
    return(dispatch,getState)=>{
        const {authUsers} = getState()
        dispatch(showLoading())
        return saveTweet({
            text,
            author:authUsers,
            replyingTo
        })
        .then((tweet)=> dispatch(addTweet(tweet)))
        .then(()=> dispatch(hideLoading()))
    }
}