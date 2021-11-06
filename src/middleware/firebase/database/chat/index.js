import firebaseInstance from '../../';

async function getMessages(userId) {
    let objects = await firebaseInstance.firebase.database()
        .ref(`users/${window.user.uid}/chat/${userId}`)
        .once('value');
    let objectsArr = [];
    let map = objects.val();
    for (let key in map) {
        if(typeof map[key] === 'object')
            map[key].id = key;
        objectsArr.push(map[key]);
    }
    return objectsArr;
}

function insertMessage(options) {
    //options = { userId , message }
    console.log(options)
    return firebaseInstance.firebase
        .database()
        .ref(`users/${window.user.uid}/chat/${options.userId}`)
        .push(options.message).then(()=>{
            return firebaseInstance.firebase
                .database()
                .ref(`users/${options.userId}/chat/${window.user.uid}`)
                .push(options.message);
        })
}

export default {
    getMessages, insertMessage
}
