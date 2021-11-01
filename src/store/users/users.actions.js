import firestore from '../../middleware/firebase/firestore/users'

export default {

    getUsers: async ({commit}) => {
        const users = await firestore.getUsers()
        commit('setUsers', users);
    },

    deleteUser: async ({state, commit}) =>{
        await firestore.removeUser(state.editedUserId)
        commit('resetEditedUserId')
        commit('deleteUser', state.editedUserId)
    },

    updateUser: async ({state, commit}) =>{
        let user = {}
        Object.assign(user, state.editedObj)
        user.id = state.editedUserId;
        //save in DB:
        await firestore.updateUser({ id: state.editedUserId, user});
        //save in store:
        commit('setEditedUser');
        commit('resetEditedUserId');
        commit('editUser', user);
    },

    insertUser: async ({state, commit}) =>{
        let user = {};
        Object.assign(user, state.editedObj);
        user.id = new Date().getTime()
        await firestore.createNewUser(user)
        commit('resetEditedUser');
        commit('insertUser', user)
    },

    setEditUserById: async ({state, commit}) => {
        let user = {}
        if(state.users.length && state.users.find(user => user.id === state.editedUserId)){
            user = state.users.find(user => user.id === state.editedUserId);
        }
        else{
            user = await firestore.getUserById( state.editedUserId);
        }
        commit('setEditedUser', user);
    }
}