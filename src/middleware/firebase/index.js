// Import the functions you need from the SDKs you need
const firebase = require('firebase/app');
import auth from 'firebase/auth';

firebase.initializeApp(
    {
    apiKey: "AIzaSyCWudOVdvTA5JsNF9CK1vt2cocZU0nNMEQ",
    authDomain: "fitnesspot-10d17.firebaseapp.com",
    projectId: "fitnesspot-10d17",
    storageBucket: "fitnesspot-10d17.appspot.com",
    messagingSenderId: "172495419834",
    appId: "1:172495419834:web:a55aa22bc74ad06fe6c583",
        databaseURL: "https://fitnesspot-10d17-default-rtdb.europe-west1.firebasedatabase.app/",
    });

export default {
    firebase
}

