import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatTweet} from '../utils/helpers'

class Tweet extends Component{
    render(){
        console.log(this.props)
        return(
            <div className="tweet">
                tweet
            </div>
        )
    }
}

function mapStateToProps ({authUsers, users, tweets}, { id }) {
    const tweet = tweets[id];
    //const parent=tweet ? tweet.replyingTo : null
    const authors=users[tweet.author]
    console.log(authors)
    console.log('users',users)
    
    return {
        authUsers,
        tweet: formatTweet(tweet, users[tweet.author], authUsers)
    }
}

export default connect(mapStateToProps)(Tweet)