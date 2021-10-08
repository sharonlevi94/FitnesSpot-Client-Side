import database from "../../middleware/firebase/database";

export default {

    getUsers: async ({commit}) => {
        const users = await database.read({entity: 'users'});
        commit('setUsers', users);
    },

    deleteUser: async ({state, commit}) =>{
        await database.remove({entity: 'users', id: state.editedUserId});
        commit('resetEditedUserId')
        commit('deleteUser', state.editedUserId)
    },

    updateUser: async ({state, commit}) =>{
        let user = {}
        Object.assign(user, state.editedObj)
        user.id = state.editedUserId;
        //save in DB:
        await database.update({entity:'users', id: state.editedUserId, user});
        //save in store:
        commit('setEditedUser');
        commit('resetEditedUserId');
        commit('editUser', user);
    },

    insertUser: async ({state, commit}) =>{
        let user = {};
        Object.assign(user, state.editedObj);
        user.id = (await database.create({entity: 'users', item: user })).key
        commit('resetEditedUser');
        commit(' insertUser', user)
    },

    setEditUserById: async ({state, commit}) => {
        let user = {}
        if(state.users.length && state.users.find(user => user.id === state.editedUserId)){
            user = state.users.find(user => user.id === state.editedUserId);
        }
        else{
            user = await database.read({entity: 'users', id: state.editedUserId});
        }
        commit('setEditedUser', user);
    }
}