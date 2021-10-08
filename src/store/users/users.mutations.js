export default {
    setUsers: ((state, users) => state.users = users),

    setEditedUserId: ((state, id) => state.editedUserId = id),

    setEditedUser: ((state, user) => state.editedObj = user),

    resetEditedUserId: ((state) => state.editedUserId = ''),

    resetEditedUser: ((state) =>{
        for(let key in state.editedObj){
            state.editedObj[key] = '';
        }
        delete state.editedObj.id;
    }),

    editUser: ((state, wantedUser) =>{
        let index = state.users.findIndex(user => user.id === wantedUser.id)
        state.users.splice(index, 1, wantedUser);
    }),

    deleteUser: ((state, userId) => {
        let index = state.users.findIndex(user => user.id === userId.id)
        state.users.splice(index, 1);
    }),

    insertUser: ((state, user) =>{
        state.users.push(user)
    })
}