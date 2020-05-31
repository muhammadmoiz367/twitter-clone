import React,{Component} from 'react'
import {handleAddTweet} from '../actions/tweets'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class NewTweet extends Component{
    state={
        text:'',
        toHome:false
    }
    handleChange=e=>{
        const text=e.target.value
        this.setState({
            text
        })
    }
    handleSubmit=e=>{
        e.preventDefault()
        const {text} =this.state
        const {dispatch,id} = this.props
        dispatch(handleAddTweet(text,id))
        
        this.setState({
            text:'',
            toHome: id ? false : true
        })
        
    }
    render(){
        const  {text,toHome} =this.state
        const tweetLeft=280-text.length
        
        if(toHome===true){
           return <Redirect to="/" />
        }
        return(
            <div>
                <h3 className="center">Compose new Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea 
                        className="textarea"
                        onChange={this.handleChange}
                        maxLength={280}
                        placeholder="What's happening?"
                        value={text}
                    />
                    
                        <div style={{visibility: tweetLeft <= 100 ? 'visible' : 'hidden' }} className="tweet-length">
                            {tweetLeft}
                        </div>
                    
                    <button disabled={text===""} type="submit" className="btn ">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)