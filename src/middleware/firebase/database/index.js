import firebaseInstance from '../';

async function getUserData(options) {
    let res = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).once('value');
    console.log(res);
}

function create(options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).push(options.item);
}

export default {
    getUserData, create
}
