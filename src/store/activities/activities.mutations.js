export default {
    setActivities: ((state, activities) => state.activities = activities),

    setEditedActivityId: ((state, id) => state.editedActivityId = id),

    setEditedActivity: ((state, activity) => state.editedObj = activity),

    resetEditedActivityId: ((state) => state.editedActivityId = ''),

    resetEditedActivity: ((state) =>{
        for(let key in state.editedObj){
            state.editedObj[key] = '';
        }
        delete state.editedObj.id;
    }),

    editActivity: ((state, wantedActivity) =>{
        let index = state.activities.findIndex(activity => activity.id === wantedActivity.id)
        state.activities.splice(index, 1, wantedActivity);
    }),

    deleteActivity: ((state, activityId) => {
        let index = state.activities.findIndex(activity => activity.id === activityId)
        state.activities.splice(index, 1);
    }),

    insertActivity: ((state, activity) =>{
        state.activities.push(activity)
    })
}