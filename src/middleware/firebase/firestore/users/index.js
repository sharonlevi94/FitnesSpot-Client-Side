import firebaseInstance from '../../';
import firestore from "firebase/firestore"

function createNewUser(userRecords){
    console.log(userRecords)
    return firebaseInstance.firebase.firestore().collection('users').doc(window.user.uid).set(userRecords)
}

export default {
    createNewUser
}