import firestore from '../../middleware/firebase/firestore/users'
import firebaseInstance from '../../middleware/firebase'

export default {

    getUsers: async ({commit}) => {
        const users = await firestore.getUsers()
        commit('setUsers', users);
    },

    deleteUser: async ({state, commit}) =>{
        await firestore.removeUser(state.editedUserId)
        commit('resetEditedUserId')
        commit('deleteUser', state.editedUserId)
    },

    updateUser: async ({state, commit}) =>{
        let user = {}
        Object.assign(user, state.editedObj)
        user.id = state.editedUserId;
        //save in DB:
        await firestore.updateUser({ id: state.editedUserId, user});
        //save in store:
        commit('setEditedUser');
        commit('resetEditedUserId');
        commit('editUser', user);
    },

    insertUser: async ({state, commit}) =>{
        let user = {};
        Object.assign(user, state.editedObj);
        user.id = new Date().getTime()
        await firestore.createNewUser(user)
        commit('resetEditedUser');
        commit('insertUser', user)
    },

    setEditUserById: async ({state, commit}) => {
        let user = {}
        if(state.users.length && state.users.find(user => user.id === state.editedUserId)){
            user = state.users.find(user => user.id === state.editedUserId);
        }
        else{
            user = await firestore.getUserById( state.editedUserId);
        }
        commit('setEditedUser', user);
    },

    handleAuthStateChanged: async ({state})=>{
        firebaseInstance.firebase.auth().onAuthStateChanged(user=>{
            if(user){
                // User is logged in
                firestore.setAuthState(window.user.uid,true)
            }
            else{
                // User is logged out
                console.log('user logout')
                firestore.setAuthState(state.editedUserId,false)
            }
        })
    },

    signUpUser: async ({}, details)=>{
        // details = { email , password }
        try{
            let userCredential = await firebaseInstance.firebase.auth()
                .createUserWithEmailAndPassword(details.email, details.password);
            return userCredential
        }
        catch(error){
            console.log(error)
        }
    },

    loginUser: async ({state, commit, dispatch}, options)=>{
        try {
            let userCredential = await firebaseInstance.firebase.auth()
                .signInWithEmailAndPassword(options.email, options.password)
            // Signed in
            let user = userCredential.user;
            user.online = true
            window.user = user;
            commit('setEditedUserId', window.user.uid)
            await dispatch('getUsers')
            dispatch('setEditUserById')
            window.user.details = state.editedObj
            window.user.details.online = true
        } catch (error) {
            console.log(error)
            /* let errorCode = error.code;
             let errorMessage = error.message;*/
        }
    },

    googleLogin: async ({})=>{
        try {
            const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
            let result = await firebaseInstance.firebase.auth().signInWithPopup(provider);
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            let name = user.displayName.split(" ")
            let details = {
                first_name: name[0],
                last_name: name[1],
                email: user.email,
                online: true,
            }
            user.details = details
            //Object.assign(user.details, details)
            //window.user = user
            Object.assign(window.user, user)
            console.log(window.user)
            await firestore.createNewUser(details)

        }catch (error) {
            console.log(error.message);
            /*let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;*/
        }
    },

    logoutUser: async () =>{
        await firebaseInstance.firebase.auth().signOut();
    },

    usersChangedListener: async ({})=>{
        let users = await firestore.users.changesListener()
        commit('setUsers', users);
    },

    getUserDetails: async ({},id)=>{
        return firestore.getUserById(id).then((userRecords)=>{
            return userRecords
        })
    }
}