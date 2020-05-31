import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import {BrowserRouter as Router,Route } from 'react-router-dom'
import Dashboard from './dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './newTweet'
import TweetPage from './tweetPage'
import Navbar from './navbar'

class App extends Component {
    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }
    render() {
    return (
        <Router>
            <Fragment>
            <LoadingBar style={{backgroundColor:"blue"}}/>
            <div className="container">
                <Navbar />    
                {this.props.loading===true
                 ? null
                 :  <div>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/new" component={NewTweet} />
                        <Route path="/tweet/:id" component={TweetPage} />
                    </div>
                }
            </div>
          </Fragment>  
        </Router>
        
      
    )
  }
}


function mapStateToProps({authUsers}){
    return{
        loading:authUsers === null
    }
}

export default connect()(App)