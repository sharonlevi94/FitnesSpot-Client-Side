export default {
    setMessages: ((state, messages) => state.messages = messages),

    deleteMessage: ((state, messageId) => {
        let index = state.messages.findIndex(message => message.id === messageId)
        state.messages.splice(index, 1);
    }),

    insertMessage: ((state, message) =>{
        state.messages.push(message)
    }),

    setEditedMessageId: ((state, id) => state.editedMessageId = id),

    setEditedMessage: ((state, message) => state.editedMessage = message),

    resetEditedMessageId: ((state) => state.editedMessageId = ''),

    resetEditedMessage: ((state) =>{
        for(let key in state.editedMessage){
            state.editedMessage[key] = '';
        }
        delete state.editedMessage.id;
    }),
}