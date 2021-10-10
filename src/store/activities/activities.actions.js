import database from "../../middleware/firebase/database";

export default {

    getActivities: async ({commit}) => {
        const activities = await database.read({entity: 'activities'});
        commit('setActivities', activities);
    },

    deleteActivity: async ({state, commit}) =>{
        await database.remove({entity: 'activities', id: state.editedActivityId});
        commit('resetEditedActivityId')
        commit('deleteActivity', state.editedActivityId)
    },

    updateActivity: async ({state, commit}) =>{
        let activity = {}
        Object.assign(activity, state.editedObj)
        activity.id = state.editedActivityId;
        //save in DB:
        await database.update({entity:'activities', id: state.editedActivityId, activity});
        //save in store:
        commit('resetEditedActivity');
        commit('resetEditedActivityId');
        commit('editActivity', activity);
    },

    insertActivity: async ({state, commit}) =>{
        let activity = {};
        Object.assign(activity, state.editedObj);
        activity.id = (await database.create({entity: 'activities', item: activity })).key
        commit('resetEditedActivity');
        commit('insertActivity', activity)
    },

    setEditActivityById: async ({state, commit}) => {
        console.log(state.editedActivityId);
        let activity = {}
        if(state.activities.length && state.activities.find(activity => activity.id === state.editedActivityId)){
            activity = state.activities.find(activity => activity.id === state.editedActivityId);
        }
        else{
            activity = await database.read({entity: 'activities', id: state.editedActivityId});
        }
        commit('setEditedActivity', activity);
    },
}