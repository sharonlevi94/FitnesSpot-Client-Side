import firebaseInstance from '../../';
import firestore from "firebase/firestore"

async function insertPostToDB(options) {
    console.log(options)
    return firebaseInstance.firebase.firestore().collection('allPosts').doc(`${options.id}`).set(options.item)
        .then(()=>{
            console.log('post added to DB')
            return  firebaseInstance.firebase.firestore().collection('users').doc(window.user.uid).collection('posts')
                .doc(`${options.id}`).set(options.item)
        })
}

function getPosts(){
    return firebaseInstance.firebase.firestore().collection('allPosts').get()
        .then((querySnapshot)=>{

            let posts = [];
            querySnapshot.forEach((doc) => {
                let post = {}
                Object.assign(post, doc.data());
                post.id = doc.id;
                posts.push(post);
            });
            return posts;
    })
}

function getPostById(id){
    return firebaseInstance.firebase.firestore().collection('allPosts')
        .doc(id).get().then((doc)=>{
            if(doc.exists){
                return doc.data();
            }
        }).catch((err)=>{
            console.log(err)
        })
}

function deletePost(id){
    firebaseInstance.firebase.firestore().collection('allPosts')
        .doc(id).delete().then(()=>{
        firebaseInstance.firebase.firestore().collection('users').doc(window.user.uid).collection('posts')
            .doc(id).delete().then(()=>{})
    })
}

function updatePost(options){
    return firebaseInstance.firebase.firestore().collection('allPosts')
        .doc(`${options.id}`).update(options.new).then(()=>{
            return  firebaseInstance.firebase.firestore().collection('users')
                .doc(window.user.uid).collection('posts')
                .doc(`${options.id}`).update(options.new).then(()=>{})
        })
}

export default {
    insertPostToDB,
    getPosts,
    getPostById,
    deletePost,
    updatePost
}