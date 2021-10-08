import database from "../../middleware/firebase/database";

export default {

    getPosts: async ({commit}) => {
        const activities = await database.read({entity: 'posts'});
        commit('setPosts', activities);
    },

    deletePost: async ({state, commit}) =>{
        await database.remove({entity: 'posts', id: state.editedPostId});
        commit('resetEditedPostId')
        commit('deletePost', state.editedPostId)
    },

    updatePost: async ({state, commit}) =>{
        let post = {}
        Object.assign(post, state.editedObj)
        post.id = state.editedPostId;
        //save in DB:
        await database.update({entity:'posts', id: state.editedPostId, post});
        //save in store:
        commit('resetEditedPost');
        commit('resetEditedPostId');
        commit('editPost', post);
    },

    insertPost: async ({state, commit}) =>{
        let post = {};
        Object.assign(post, state.editedObj);
        post.id = (await database.create({entity: 'posts', item: post })).key
        commit('resetEditedPost');
        commit(' insertPost', post)
    },

    setEditPostById: async ({state, commit}) => {
        let post = {}
        if(state.posts.length && state.posts.find(post => post.id === state.editedPostId)){
            post = state.posts.find(post => post.id === state.editedPostId);
        }
        else{
            post = await database.read({entity: 'posts', id: state.editedPostId});
        }
        commit('setEditedPost', post);
    }
}