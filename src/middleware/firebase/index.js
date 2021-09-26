// Import the functions you need from the SDKs you need
//import firebase from 'firebase/app'
const firebase = require('firebase/app');
     /*auth = require('firebase/auth');*/
import auth from 'firebase/auth';

firebase.initializeApp(
    {
    apiKey: "AIzaSyCWudOVdvTA5JsNF9CK1vt2cocZU0nNMEQ",
    authDomain: "fitnesspot-10d17.firebaseapp.com",
    projectId: "fitnesspot-10d17",
    storageBucket: "fitnesspot-10d17.appspot.com",
    messagingSenderId: "172495419834",
    appId: "1:172495419834:web:a55aa22bc74ad06fe6c583"
    });

export default {
    firebase
}

