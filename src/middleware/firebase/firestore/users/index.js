import firebaseInstance from '../../';
import firestore from "firebase/firestore"

function createNewUser(userRecords){
    console.log(userRecords)
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid).set(userRecords)
}

function getUsers(){
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .get()
        .then((querySnapshot)=>{
            let users = [];
            querySnapshot.forEach((doc) => {
                let user = {}
                Object.assign(user, doc.data());
                user.id = doc.id;
                users.push(user);
            });
            return users;
        })
}

function removeUser(id){
    firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(id)
        .delete().then(()=>{})
}

function updateUser(options){
    //options need to be an object like: { id, new }
    firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(`${options.id}`)
        .update(options.new).then(()=>{})
}

function getUserById(id){
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(id).get().then((doc)=>{
            if(doc.exists){
                return doc.data();
            }
        }).catch(()=>{
            console.log('user doesnt exist')
        })
}

export default {
    createNewUser,
    getUsers,
    removeUser,
    updateUser,
    getUserById
}