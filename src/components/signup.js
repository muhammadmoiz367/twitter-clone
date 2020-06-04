import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {signUp} from '../actions/auth'

class SignUp extends Component {
  state = { 
      email: "", 
      fisrtName:"",
      lastName:"",
      password:"",
  };

  handleChange = (e) => {
    
      this.setState({ 
        [e.target.name]:e.target.value
    });
  }


  handleSubmit = () => {
    
    const { email, password,name,avatarURL } = this.state;
      const {dispatch, authError} =this.props
      
      if(email !== "" && password !== "" && name !== "" && avatarURL !== ""){
        dispatch(signUp(this.state))    
          console.log(this.state)
      }
      
  };

  render() {
      const {auth,authError}=this.props
      if(auth.uid) 
          <Redirect to="/" />
      return (
        <Container id="signupform" component="main" maxWidth="xs">
          <Paper className="paper">
            <Avatar className="avatar">
              
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="fisrtName"
              label="fisrtName"
              name="fisrtName"
              onChange={this.handleChange}
            />
              <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastName"
              label="lastName"
              name="lastName"
              onChange={this.handleChange}
            />
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
                Create account
            </Button>
            <div>
                {authError ? <p className="errorText">{authError}</p> : null}
            </div>
          </Paper>
        </Container>
      );
    }
  }


const mapStateToProps=({auth,firebase})=>{
    return{
        auth:firebase.auth,
        authError:auth.authError
    }
}  
  
export default connect(mapStateToProps)(SignUp)