import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig={
    apiKey: "AIzaSyBCFv3Z_OuM1DWC3QZLE7NQr8rILpvDOqc",
    authDomain: "twitter-clone-f0040.firebaseapp.com",
    databaseURL: "https://twitter-clone-f0040.firebaseio.com",
    projectId: "twitter-clone-f0040",
    storageBucket: "twitter-clone-f0040.appspot.com",
    messagingSenderId: "1009535836525",
    appId: "1:1009535836525:web:d0fb8fa759df9d7909ba64",
    measurementId: "G-6JGDN193FW"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };
export default firebase;