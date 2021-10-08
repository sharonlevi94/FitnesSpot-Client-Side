import state from './posts.state'
import mutations from './posts.mutations'
import actions from './posts.actions'
import getters from './posts.getters'

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}