import firebaseInstance from '../../';
import firestore from "firebase/firestore"

async function insertMessageToDB(options) {
    //options = { userId, id , message }
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid)
        .collection('chat')
        .doc(`${options.userId}`)
        .set(options.message)
        .then(()=>{})
}

function getMessages(id){
    return firebaseInstance.firebase.firestore()
        .collection('users')
        .doc(window.user.uid)
        .collection('chat')
        .doc(`${id}`)
        .get()
        .then((querySnapshot)=>{
            let posts = [];
            querySnapshot.forEach((doc) => {
                let post = {}
                Object.assign(post, doc.data());
                post.id = doc.id;
                post.currComment = '';
                posts.push(post);
            });
            return posts;
        })
}

export default {
    insertMessageToDB,
    getMessages,
}