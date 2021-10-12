import firebaseInstance from '../';

async function read(options) {
    if (options.Id) {
        let objects = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.Id}`).once('value');
        let map = objects.val();
        let objectsArr = [];
        objectsArr.push(map);
        return objectsArr;
    }
    let objects = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).once('value');
    let objectsArr = [];
    let map = objects.val();
    for (let key in map) {
        if(typeof map[key] === 'object')
        map[key].id = key;
        objectsArr.push(map[key]);
    }
    return objectsArr;
}

async function readSettings(options) {
    let wantedSettings = await firebaseInstance.firebase.database().ref(`settings/${options.entity}`).once('value');
    return wantedSettings.val();
}

/*async function readAsset(options){
    let wantedSettings = await firebaseInstance.firebase.database().ref(`assets}`).once('value');
    let urls = wantedSettings.val();
    for(let url of urls){
        if(url === options.url)
            return url;
    }
    return null;
}*/

function create(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).push(options.item);
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}`).remove();
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}`).update(options.new);
}

function getEntityRef(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`);
}

export default {
    read, create, remove, update, readSettings, getEntityRef
}
