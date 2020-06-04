import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Tweet from './tweet'
import NewTweet from './newTweet'
 
class TweetPage extends Component{
    render(){
        const {id,replies,auth}=this.props
        if(!auth.uid) 
            return <Redirect to="/login" />
        return(
            <div>
                <br/><br/>
                <Tweet id={id}/>
                <NewTweet id={id} />
                {replies.length !== 0 && <h3 className="center">Replies</h3>}
                <ul>
                {replies.map((id)=>(
                        <li key={id}>
                            <Tweet id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({tweets,authUsers,users,firebase},props){
    const {id} = props.match.params
    return{
        id,
        replies:!tweets[id]
            ? []
            : tweets[id].replies.sort((a,b)=>tweets[b].timestamp - tweets[a].timestamp),
        auth:firebase.auth
    }
}

export default connect(mapStateToProps)(TweetPage)