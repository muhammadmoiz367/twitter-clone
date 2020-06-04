import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import {signIn} from '../actions/auth'

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Alert from '@material-ui/lab/Alert';

class Login extends Component {
  state = { alertClose: false,email: "", password: "" };

    
  handleChange = (e) => {
    this.setState({ 
        [e.target.name]:e.target.value
    });
  }


  handleSubmit = () => {
    this.setState({
        alertClose:false
    })
    const { email, password } = this.state;
    const {dispatch}=this.props  
    dispatch(signIn(this.state));
  };

  render() {
      const {authError,auth}=this.props
      if(auth.uid) 
          <Redirect to="/" />
     
      return (
        <Container component="main" maxWidth="xs">
              {authError ? (<Alert severity="error" style={{visibility: !this.state.alertClose ? 'visible' : 'hidden'}} onClose={()=>this.setState({alertClose:true})} closeText='close'>{authError}</Alert>) : null}
          <Paper className="paper">
            <Avatar className="avatar">
              
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              style={{backgroundColor:'#1b1bff'}}
              className="submit"
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
            <div id="toSignup">
                <p>Dont have an account? <Link to="/signup" style={{color:'blue'}}>Create new</Link></p>
            </div>
            <div>
                
            </div>
          </Paper>
        </Container>
      );
    }
  }

const mapStateToProps=({auth, firebase})=>{
    return{
        authError:auth.authError,
        auth:firebase.auth
    }
}  
  
export default connect(mapStateToProps)(Login)