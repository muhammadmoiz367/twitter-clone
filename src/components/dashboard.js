import React,{Component} from 'react'
import { connect } from 'react-redux'
import Tweet from './tweet'


class Dashboard extends Component{
    getName(){
        const {users,authUsers} = this.props
        for(let user in users){
            console.log(users)
            if(user===authUsers){
                return users[user].name.split(' ')[0]
            }
        }
    }
    
    render(){
        console.log(this.props)
        
        return(
            <div>
                <h3 className="center">Your Timeline {this.getName()}</h3>
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

function mapStateToProps({ tweets,authUsers, users }){
    return{
        authUsers,
        users,
        tweetsID:Object.keys(tweets)
        .sort((a,b)=>tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)