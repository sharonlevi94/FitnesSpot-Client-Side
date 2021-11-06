import firebaseInstance from '../';
import firebaseFireStore from '../firestore';

async function upload(options) {
    //options = {id,file}
    // Create a root reference
    console.log(options)
    let storageRef = firebaseInstance.firebase.storage();

    // Create a reference to the file we want to upload
    let pathReference = storageRef.ref().child(`users/${window.user.uid}/images/${options.file.name}`);

    await pathReference.put(options.file);
    console.log('Uploaded a blob or file!');
}

async function read(urlArr, id) {
    let pathURL = [];
    // Create a reference to Storage:
    let storageRef = firebaseInstance.firebase.storage();

    for (let url of urlArr) {
        let pathReference = storageRef.ref().child(`users/${id}/images/${url.name}`);
        let imageObj = {};
        Object.assign(imageObj, url)
        imageObj.downloadURL = await pathReference.getDownloadURL();
        pathURL.push(imageObj.downloadURL);
    }
    return pathURL;
}

async function uploadProfilePicture(options) {
    //options = {currPicture(downloadURL), file(the file uploaded)}}
    let storageRef = firebaseInstance.firebase.storage();
    /*storageRef.ref().child(`users/${window.user.uid}/profileImage/${options.currPicture}`).delete()
        .then(() => {
            let pathRef = storageRef.ref()
                .child(`users/${window.user.uid}/profileImage/${options.file.name}`)
            pathRef.put(options.file);
            console.log('Uploaded a profile picture!');
            return pathRef.getDownloadURL();
        }).catch(() =>  {
        console.log(options)*/
    let pathRef = storageRef.ref(`users/${window.user.uid}/profileImage/${options.file.name}`)
    return await pathRef.put(options.file).then(() => {
        console.log('Uploaded a profile picture!');
        return pathRef.getDownloadURL().then((downloadURL) => {
        return downloadURL
        });
    });
    //console.log('cannot delete image in storage')
    //   })
}

async function readProfilePicture(imageObj) {
    // Create a reference to Profile Picture:
    let storageRef = firebaseInstance.firebase.storage();
    let pathReference = storageRef.ref().child(`users/${imageObj.authorId}/profileImage/${imageObj.name}`);
    //get the URL:
    return pathReference.getDownloadURL().then((downloadURL)=>{
        return downloadURL;
    });

}

async function readAsset(fileName) {
    let storageRef = firebaseInstance.firebase.storage();
    let pathReference = storageRef.ref().child(`assets/${fileName}`);
    return await pathReference.getDownloadURL();
}

export default {
    upload, read, uploadProfilePicture, readProfilePicture, readAsset
}