import firebase, { db } from '../firebase/firebase';
import {setProgressBar} from './progressBar'
import 'firebase/auth';
import 'firebase/firestore';

export const LOGIN_SUCCESS='LOGIN_SUCCESS'
export const LOGIN_ERROR='LOGIN_ERROR'
export const SIGNOUT_SUCCESS='SIGNOUT_SUCCESS'
export const SIGNOUT_ERROR='SIGNOUT_ERROR'
export const SIGNUP_SUCCESS='SIGNUP_SUCCESS'
export const SIGNUP_ERROR='SIGNUP_ERROR'

function loginSuccess(){
    return{
        type:LOGIN_SUCCESS
    }
}
function loginError(err){
    return{
        type:LOGIN_ERROR,
        err
    }
}
function signoutSuccess(){
    return{
        type:SIGNOUT_SUCCESS
    }
}
function signoutError(err){
    return{
        type:SIGNOUT_ERROR,
        err
    }
}
function signupSuccess(){
    return{
        type:SIGNUP_SUCCESS
    }
}
function signupError(err){
    return{
        type:SIGNUP_ERROR,
        err
    }
}


export const signIn=(credentials)=>{
    return (dispatch,getState, {getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then(()=>{
            dispatch(loginSuccess())
            dispatch(setProgressBar('OPEN'))
        }).then(()=>{
            setTimeout(()=>{
                dispatch(setProgressBar('CLOSE'))    
            },2000)
        })
        .catch((err)=>{
            dispatch(loginError(err))
        })
    }
}

export const signOut=()=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut()
        .then(()=>{
            dispatch(setProgressBar('OPEN'))
        }).then(()=>{
            setTimeout(()=>{
                dispatch(setProgressBar('CLOSE'))    
            },2000)
        })
        .catch((err)=>{
            dispatch(signoutError(err))
        })
    }
}

export const signUp=(newUser)=>{
    return (dispatch,getState,{getFirebase, getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirebase().firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response)=>{
            return db.collection('users').doc(response.user.uid).set({
                fisrtName:newUser.fisrtName,
                name:newUser.fisrtName+newUser.lastName,
                initials:newUser.fisrtName[0]+newUser.lastName[0],
                tweets:[]
            }).then(()=>{
                dispatch(signupSuccess())
            }).catch(err =>{
                dispatch(signupError(err))
            })
        })
    }
}