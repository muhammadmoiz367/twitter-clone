import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import {BrowserRouter as Router,Route, Redirect } from 'react-router-dom'
import Dashboard from './dashboard'
import ProgressBar from "./progressBar";
import NewTweet from './newTweet'
import TweetPage from './tweetPage'
import Navbar from './navbar'
import LogIn from './signin'
import SignUp from './signup'

class App extends Component {
    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }
    render() {
        console.log(this.props)
        const {auth}= this.props
    return (
        <Router>
            <Fragment>
            <ProgressBar /> 
            <div className="container">
                <Navbar />
                {auth.uid && auth.uid 
                    ? ( <Redirect to={{ pathname: "/" }} /> )
                    : ( <Redirect to={{ pathname: "/login" }} /> )
                }
                {this.props.loading===true
                    ? null
                    :  <div>
                            <Route path="/" exact component={Dashboard} />
                            <Route path="/new" component={NewTweet} />
                            <Route path="/tweet/:id" component={TweetPage} />
                            <Route path="/login" component={LogIn} />
                            <Route path="/signup" component={SignUp} />
                        </div>
                }
            </div>
          </Fragment>  
        </Router>
        
    )
  }
}


function mapStateToProps(state){
    console.log(state)
    return{
        loading:state.authUsers === null,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(App)