import firebaseInstance from '../';
import firebaseDataBase from '../database';

async function upload(file){
    // Create a root reference
    let storageRef = firebaseInstance.firebase.storage();

    // Create a reference to the file we want to upload
    let pathReference = storageRef.ref().child(`images/${file.name}`);

    await pathReference.put(file);
    console.log('Uploaded a blob or file!');

    //add the url to the database:
    firebaseDataBase.create({entity:'images', item: file.name});
}

async function read(){
    //get the URLs from DB:
    let urlArr = await firebaseDataBase.read({entity:'images'});
    let pathURL = [];
    // Create a reference to Storage:
    let storageRef = firebaseInstance.firebase.storage();

    for(let url of urlArr){
        let pathReference = storageRef.ref().child(`images/${url}`);
        let downloadURL = await pathReference.getDownloadURL();
        pathURL.push(downloadURL);
    }
    return pathURL;
}

export default {
    upload, read
}