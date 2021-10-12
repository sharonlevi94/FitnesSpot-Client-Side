export default {
    setPosts: ((state, posts) => state.posts = posts),

    setEditedPostId: ((state, id) => state.editedPostId = id),

    setEditedPost: function (state, post) {
    state.editedObj = post;
},

    resetEditedPostId: ((state) => state.editedPostId = ''),

    resetEditedPost: ((state) =>{
        for(let key in state.editedObj){
            state.editedObj[key] = '';
        }
        delete state.editedObj.id;
    }),

    editPost: ((state, wantedPost) =>{
        let index = state.posts.findIndex(post => post.id === wantedPost.id)
        state.posts.splice(index, 1, wantedPost);
    }),

    deletePost: ((state, postId) => {
        let index = state.posts.findIndex(post => post.id === postId)
        state.posts.splice(index, 1);
    }),

    insertPost: ((state, post) =>{
        state.posts.push(post)
        console.log(state.posts);
    })
}