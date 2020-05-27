import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './dashboard'

class App extends Component {
    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }
    render() {
    return (
      <div>
        {this.props.loading===true
         ? <Loader />
         : <Dashboard />
        }
        
      </div>
    )
  }
}
const  Loader=()=>{
    return(
        <h3>Loading data...</h3>
    )
}


function mapStateToProps({authUsers}){
    return{
        loading:authUsers === null
    }
}

export default connect()(App)