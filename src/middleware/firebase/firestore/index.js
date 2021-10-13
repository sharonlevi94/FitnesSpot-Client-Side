import firebaseInstance from '../';
import firestore from "firebase/firestore"
import activities from './activities'
import posts from './posts'
import users from './users'
import images from './images'

export default {
    modules:{
        activities, users, posts, images
    }
}
