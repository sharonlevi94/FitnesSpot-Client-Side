import firebaseInstance from '../';
import firebaseFireStore from '../firestore';

async function upload(file) {
    // Create a root reference
    let storageRef = firebaseInstance.firebase.storage();

    // Create a reference to the file we want to upload
    let pathReference = storageRef.ref().child(`users/${window.user.uid}/images/${file.name}`);

    await pathReference.put(file);
    console.log('Uploaded a blob or file!');

    //add the url to the database:

    let imageId = new Date().getTime()
    await firebaseFireStore.modules.images.uploadImage
    ({entity:'images', id: imageId, item: file.name })
}

async function read() {
    //get the URLs from DB:

    let urlArr = await firebaseFireStore.modules.images.getImages()
    let pathURL = [];
    // Create a reference to Storage:
    let storageRef = firebaseInstance.firebase.storage();

    for (let url of urlArr) {
        let pathReference = storageRef.ref().child(`users/${window.user.uid}/images/${url}`);
        let imageObj = {};
        imageObj.url = url;
        imageObj.downloadURL = await pathReference.getDownloadURL();
        pathURL.push(imageObj);
    }
    return pathURL;
}

async function uploadProfilePicture(file) {
    // Create a reference to current Profile picture and delete it
/*    let dirRef = firebaseInstance.firebase.storage().ref()
        .child(`users/${window.user.uid}/profileImage`);*/
    /*await dirRef.remove();

    let currentPicture = readProfilePicture();
    if (currentPicture) {
        await dirRef.delete();
        await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/profileImage`).remove();
    }*/

    // Create a reference to new profile picture folder
    let storageRef = firebaseInstance.firebase.storage();
    let pathReference = storageRef.ref()
        .child(`users/${window.user.uid}/profileImage/${file.name}`);

    await pathReference.put(file);
    console.log('Uploaded a profile picture!');

    //add the url to the database:
    let imageId = new Date().getTime()
    firebaseFireStore.modules.images.uploadProfilePicture
    ({ id: imageId, item: file.name})
}

async function readProfilePicture(id) {
    //get the URLs from DB:
    let url = await firebaseFireStore.modules.images.readProfilePicture(id)
    // Create a reference to Profile Picture:
    let storageRef = firebaseInstance.firebase.storage();
    let pathReference = storageRef.ref().child(`users/${window.user.uid}/profileImage/${url}`);
    //get the URL:
    let downloadURL = await pathReference.getDownloadURL();

    return downloadURL;
}

async function readAsset(fileName) {
    let storageRef = firebaseInstance.firebase.storage();
    let pathReference = storageRef.ref().child(`assets/${fileName}`);
    return await pathReference.getDownloadURL();
}

export default {
    upload, read, uploadProfilePicture, readProfilePicture, readAsset
}