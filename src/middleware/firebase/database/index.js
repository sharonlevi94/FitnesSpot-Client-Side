import firebaseInstance from '../';
import database from 'firebase/database';

async function read(options) {
    let objects = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).once('value');
    let objectsArr = [];
    let map = objects.val();
    for(let key in map){
        map[key].id = key;
        objectsArr.push(map[key]);
    }
    console.log(objects);
    console.log(objectsArr);
    return objectsArr;
}

function create(options){
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).push(options.item);
}

function remove(options){

}

function update(options){

}

export default {
    read, create, remove, update
}
