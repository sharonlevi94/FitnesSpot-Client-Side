import firebaseInstance from '../';
import firestore from "firebase/firestore"
import activities from './activities'
import posts from './posts'
import users from './users'

export default {
    modules:{
        activities, users, posts
    }
}
