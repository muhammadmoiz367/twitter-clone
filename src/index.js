import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import { Provider,useSelector } from "react-redux";
import middleware from './middleware'
import thunk from "redux-thunk";
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";
import firebaseConfig from "./firebase/firebase";
import firebase from "firebase/app";


const store = createStore(
  reducer,
  compose(
    middleware,
    reduxFirestore(firebase,firebaseConfig)
  )
);

const profileSpecificProps={
    userProfile:'users',
    useFirestoreForProfile:true,
    enableRedirectHandling: false,
    resetBeforeLogin:false
}

const rrfProps = {
  firebase,
  config: firebaseConfig,
  config:profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({children}){
    const auth=useSelector(state=>state.firebase.auth)
    if(!isLoaded(auth)) 
        return <div>Loading screen...</div>
    return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
