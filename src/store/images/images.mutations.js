export default {
    setImages: ((state, images)=> state.images = images),

    setEditedImageId: ((state, id)=> state.editedImageId = id),

    setEditedImage: ((state, image)=> state.editedImage = image),

    resetEditedImageId: ((state)=> state.editedImageId = ''),

    resetEditedImage: ((state) =>{
        for(let key in state.editedObj){
            state.editedObj[key] = '';
        }
        delete state.editedObj.id;
    }),

    deleteImage: ((state, imageId) => {
        let index = state.images.findIndex(image => image.id === imageId)
        state.images.splice(index, 1);
    }),

    insertImage: ((state, image) =>{
        state.images.push(image)
    }),

    insertProfilePicture: ((state, image)=>{
        state.currProfilePictureURL = image;
    }),

    setProfilePictureId: ((state, id)=>{
        state.profilePictureId = id;
    }),

    setNewProfilePicture: ((state, image)=> state.newProfilePictureFile = image),
}