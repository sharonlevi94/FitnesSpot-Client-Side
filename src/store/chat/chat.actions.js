import firebaseDB from '../../middleware/firebase/database/chat'

export default {

    getMessages: async ({commit}, userId) => {
        const messages = await firebaseDB.getMessages(userId)
        commit('setMessages', messages);
    },
    insertMessage: async ({state, commit}, id) =>{
        let message = {};
        Object.assign(message, state.editedMessage);

        await firebaseDB.insertMessage({userId: id, message: state.editedMessage})

        commit('resetEditedMessage');
        commit('insertMessage', message)
    },
}