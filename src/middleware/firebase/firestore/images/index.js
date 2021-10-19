import firebaseInstance from '../../../firebase';
import firestore from "firebase/firestore"

function uploadImage(options){
    //console.log(options)
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
                image = doc.data();
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
                console.log('old picture removed')
            }
            return uploadImage(
                {entity:'profilePicture',
                id: options.id,
                item: options.new})
    })
}

function readProfilePicture(id){
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(id)
        .collection('profilePicture')
        .get().then((querySnapshot)=>{
            let images= []
        querySnapshot.forEach((doc)=>{
            let image = {}
            image = doc.data();
            images.push(image);
        })
        return images[0]
    })
}

function getImageById(id){
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid)
        .collection('images')
        .doc(id).get().then((doc)=>{
            if(doc.exists){
                return doc.data();
            }
        }).catch((err)=>{
            console.log(err)
        })
}

export default {
    uploadImage,
    removeImage,
    getImages,
    uploadProfilePicture,
    readProfilePicture,
    getImageById
}