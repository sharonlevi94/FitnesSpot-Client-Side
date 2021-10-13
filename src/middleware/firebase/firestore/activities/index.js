import firebaseInstance from '../../../firebase';
import firestore from "firebase/firestore"

function getActivities(){
    return firebaseInstance.firebase.firestore()
        .collection('users').doc(window.user.uid)
        .collection('activities').get()
        .then((querySnapshot)=>{
            let activities = [];
            querySnapshot.forEach((doc) => {
                let activity = {}
                Object.assign(activity, doc.data());
                activity.id = doc.id;
                activities.push(activity);
            });
            return activities;
        })
}

function insertActivityToDB(options){
    //options need to be an object like: { id, item }
    return  firebaseInstance.firebase.firestore()
        .collection('users').doc(window.user.uid)
        .collection('activities')
        .doc(`${options.id}`).set(options.item)
}

function removeActivity(id){
    firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid)
        .collection('activities')
        .doc(id).delete().then(()=>{})
}

function updateActivity(options){
//options need to be an object like: { id, new }
    firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid)
        .collection('activities')
        .doc(`${options.id}`).update(options.new).then(()=>{})
}

function getActivityById(id){
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid).collection('activities')
        .doc(id).get().then((doc)=>{
            if(doc.exists){
                return doc.data();
            }
        }).catch(()=>{
            console.log('activity doesnt exist')
        })
}

export default {
    getActivities,
    insertActivityToDB,
    removeActivity,
    updateActivity,
    getActivityById
}