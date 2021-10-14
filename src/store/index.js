import Vue from 'vue'
import Vuex from 'vuex'
import activities from './activities'
import posts from './posts'
import users from './users'
import images from './images'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules:{
        activities, users, posts, images
    }
})