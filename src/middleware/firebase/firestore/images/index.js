import firebaseInstance from '../../../firebase';
import firestore from "firebase/firestore"

function uploadImage(options){
    return firebaseInstance.firebase.firestore()
        .collection('users').doc(window.user.uid)
        .collection(options.entity)
        .doc(`${options.id}`).set(options.item)
}

function removeImage(options){
    firebaseInstance.firebase.firestore().collection('users')
        .doc(window.user.uid).collection(`${options.entity}`)
        .doc(options.id).delete().then(()=>{})
}

function getImages(){
    return firebaseInstance.firebase.firestore()
        .collection('users').doc(window.user.uid)
        .collection('images').get()
        .then((querySnapshot)=>{
            let images = [];
            querySnapshot.forEach((doc) => {
                let image = {}
                Object.assign(image, doc.data());
                images.id = doc.id;
                images.push(image);
            });
            return images;
        })
}

function uploadProfilePicture(options){
    //options need to be an object like: { id, new }
    firebaseInstance.firebase.firestore()
        .collection('users').doc(window.user.uid)
        .collection('profilePicture').doc(`${options.id}`)
        .get().then((doc)=>{
            if(doc.exists){
                removeImage({entity:'profilePicture' ,id: options.id});
            }
            return uploadImage({entity:'profilePicture',
                id: options.id,
                item: options.new})
    })
}

function readProfilePicture(id){
    firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid)
        .collection('profilePicture')
        .doc(id).get().then((doc)=>{
            if(doc.exists){
                return doc.data()
            }
    })
}

export default {
    uploadImage,
    removeImage,
    getImages,
    uploadProfilePicture,
    readProfilePicture
}