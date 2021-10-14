import firestore from "../../middleware/firebase/firestore/images/index.js"
import firebaseStorage from "../../middleware/firebase/storage"

export default {
    getImages: async ({commit}) => {
        const images = await firestore.getImages();
        const downloadsURLS = await firebaseStorage.read(images)
        commit('setImages', downloadsURLS);
    },

    getProfilePicture: async ({commit}) => {
        let imageObj =  await firestore.readProfilePicture();
        //imageObj with id & name
        let downloadURL = await firebaseStorage.readProfilePicture(imageObj)
        commit('insertProfilePicture', downloadURL)
    },

    deleteImageName: async ({state, commit}) =>{
        await firestore.deleteImage(state.editedImageId)
        commit('resetEditedImageId')
        commit('deleteImage', state.editedImageId)
    },

    uploadImage: async ({state, commit}) =>{
        let image = {};
        image.name = state.editedImage.name;
        let imageId = await new Date().getTime();
        image.id = imageId;
        // insert image name to firestore database
        await firestore.uploadImage({entity: 'images', item: image, id: imageId})
        //insert the image itself to storage:
        await firebaseStorage.upload({file:state.editedImage, id: imageId})

        commit('resetEditedImage');

        const images = await firestore.getImages();
        const downloadsURLS = await firebaseStorage.read(images)
        commit('setImages', downloadsURLS);
    },

    uploadProfilePicture: async ({state, commit})=> {
        let image = {}
        image.name = state.newProfilePictureFile.name
        let imageId = await new Date().getTime();
        image.id = imageId
        // insert profile picture url to firestore database
        await firestore.uploadProfilePicture({ new: image, id: imageId})
        //insert the profile Picture itself to storage:
        await firebaseStorage.uploadProfilePicture({file:state.newProfilePictureFile,
            currPicture: state.currProfilePictureURL}).then((downloadURL)=>{
                commit('insertProfilePicture', downloadURL);
            })


    },

    setEditImageNameById: async ({state, commit}) => {
        let image = {}
        if(state.images.length && state.images.find(image => image.id === state.editedImageId)){
            image = state.images.find(image => image.id === state.editedImageId);
        }
        else{
            image = await firestore.getImageById(state.editedImageId)
        }
        commit('setEditedImage', image);
    },

}