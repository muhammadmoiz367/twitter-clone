import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../actions/auth'
import Avatar from "@material-ui/core/Avatar";

const Navbar=(props)=>{
    return(
        <nav className="nav">
            {props.auth.uid && props.auth.uid 
                ? (<ul>
                        <li>
                            <NavLink to="/" exact activeClassName="active"> Home </NavLink>
                        </li>
                        <li>
                            <NavLink to="/new" exact activeClassName="active"> New Tweet </NavLink>
                        </li>
                        <li>
                            <Avatar variant="circle" className="avatar">
                                {props.profile.initials}
                            </Avatar>
                        </li>
                        <li id="logout">
                            <a onClick={props.signOut}>logout</a>
                        </li>
                    </ul>
                ) : null
            }
        </nav>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=> dispatch(signOut())
    }
}
const mapStateToProps=({firebase})=>{
    return{
        auth:firebase.auth,
        profile:firebase.profile
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
