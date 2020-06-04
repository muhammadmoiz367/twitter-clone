import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TiArrowBackOutline} from 'react-icons/ti'
import {TiHeartOutline} from 'react-icons/ti'
import {TiHeartFullOutline} from 'react-icons/ti'
import {formatTweet,formatDate} from '../utils/helpers'
import {handleToggleTweet} from '../actions/tweets'
import {Link, withRouter, Redirect} from 'react-router-dom'


class Tweet extends Component{
    handleToParent=(e,id)=>{
        e.preventDefault();
        this.props.history.push(`/tweet/${id}`)
    }
    handleLike=(e)=>{
        e.preventDefault()
        const {tweet, dispatch, authUsers}=this.props;
        dispatch(handleToggleTweet({
            id:tweet.id,
            authUsers,
            hasLiked:tweet.hasLiked
        }))
    }
    render(){
        
        const {tweet,auth} = this.props
        if(tweet===null){
            return <p>This tweet doesn't exist </p>
        }
        const {name,avatar,timestamp,text,likes,hasLiked,replies,id,parent}=tweet
        if(!auth.uid) 
            return <Redirect to="/login" />
        return(
            <Link to={`/tweet/${id}`} className="tweet">
                <img 
                    src={avatar}
                    alt={`avatar of ${name}`}
                    className="avatar"
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e)=>this.handleToParent(e,parent.id)}>
                                {`Replying to ${parent.author}`}
                            </button>
                        )}
                    </div>
                    <p>{text}</p>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button" onClick={this.handleLike}>
                            {hasLiked === true 
                            ? <TiHeartFullOutline className="tweet-icon" color="#e0245e"/>
                            : <TiHeartOutline className="tweet-icon"/>}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({authUsers, users, tweets,firebase}, { id }) {
    const tweet = tweets[id]
    const parent=tweet ? tweets[tweet.replyingTo] : null
    
    return {
        authUsers,
        auth: firebase.auth,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authUsers,parent) : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))