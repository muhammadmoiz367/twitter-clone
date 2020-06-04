import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Tweet from './tweet'


class Dashboard extends Component{
    render(){
        const {auth,profile} =this.props
        console.log(profile)
        if(!auth.uid) 
            return <Redirect to="/login" />
        return(
            <div>
                <h3 className="center">Your Timeline {profile.firstName}</h3>
                <ul className="dashboard-list">
                    {this.props.tweetsID.map((id)=>(
                        <li key={id}>
                            <Tweet id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ tweets,authUsers, users, firebase }){
    return{
        authUsers,
        users,
        tweetsID:Object.keys(tweets)
        .sort((a,b)=>tweets[b].timestamp - tweets[a].timestamp),
        auth:firebase.auth,
        profile:firebase.profile
    }
}

export default connect(mapStateToProps)(Dashboard)