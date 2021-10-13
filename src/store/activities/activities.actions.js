import firestore from "../../middleware/firebase/firestore/activities";

export default {

    getActivities: async ({commit}) => {
        const activities = await firestore.getActivities();
        commit('setActivities', activities);
    },

    deleteActivity: async ({state, commit}) =>{
        await firestore.removeActivity(state.editedActivityId);
        commit('resetEditedActivityId')
        commit('deleteActivity', state.editedActivityId)
    },

    updateActivity: async ({state, commit}) =>{
        let activity = {}
        Object.assign(activity, state.editedObj)
        activity.id = state.editedActivityId;
        //save in DB:
        await  firestore.updateActivity({entity:'activities', id: state.editedActivityId, activity})
        //save in store:
        commit('resetEditedActivity');
        commit('resetEditedActivityId');
        commit('editActivity', activity);
    },

    insertActivity: async ({state, commit}) =>{
        let activity = {};
        Object.assign(activity, state.editedObj);
        let activityId = await new Date().getTime();

        await firestore.insertActivityToDB({item: activity, id: activityId});

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
            activity = await firestore.getActivityById(state.editedActivityId)
        }
        commit('setEditedActivity', activity);
    },
}