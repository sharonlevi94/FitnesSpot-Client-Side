import firestore from "../../middleware/firebase/firestore/posts/index.js"

export default {
    getPosts: async ({commit}) => {
        const posts = await firestore.getPosts({entity: 'posts'});
        commit('setPosts', posts);
    },

    deletePost: async ({state, commit}) =>{
        await firestore.deletePost(state.editedPostId)
        commit('resetEditedPostId')
        commit('deletePost', state.editedPostId)
    },

    updatePost: async ({state, commit}) =>{
        let post = {}
        Object.assign(post, state.editedObj)
        post.id = state.editedPostId;
        //save in DB:
        await firestore.updatePost({id: state.editedPostId, new: post})
        //save in store:
        commit('resetEditedPost');
        commit('resetEditedPostId');
        commit('editPost', post);

    },

    insertPost: async ({state, commit},localPost) =>{
        let post = {};
        Object.assign(post, localPost);
        let postId = await new Date().getTime();
        // insert to firestore database

        await firestore.insertPostToDB({item: post, id: postId});
        // insert to RT database
        // post.id = (await database.create({entity: 'posts', item: post })).key
        post.id = postId;
        commit('resetEditedPost');
        commit('insertPost', post)
    },

    setEditPostById: async ({state, commit}) => {
        let post = {}
        if(state.posts.length && state.posts.find(post => post.id === state.editedPostId)){
            post = state.posts.find(post => post.id === state.editedPostId);
        }
        else{
            post = await firestore.getPostById(state.editedPostId)
        }
        commit('setEditedPost', post);
    }
}