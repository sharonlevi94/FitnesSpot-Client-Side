<template>
  <div class="q-pa-md" :style="backgroundImgURL">
    <h1 class="title">Welcome to FitnesSpot</h1>
    <h3 class="sub-title">Share your fitness with everyone!</h3>

    <div v-if="signInMode">
      <q-btn push class="header-button" color="black" text-color="white" label="Login" @click="login" />
      <q-btn push class="header-button" color="black" text-color="white" label="Sign Up"  @click="joinUs"/>
      <q-btn push class="header-button" label="Google" @click="googleLogin()"/>
    </div>

    <div v-else>
      <q-btn push class="nav-buttons" align="center" color="white" text-color="black" label="Profile" @click="changePage('/profile')" />
      <q-btn push class="nav-buttons" color="white" text-color="black" label="News Feed"  @click="changePage('/feed')"/> <br>
      <q-btn push class="nav-buttons" color="white" text-color="black" label="Workouts"  @click="changePage('/activities')"/>
      <q-btn push class="nav-buttons" color="white" text-color="black" label="Chat"  @click="changePage('/')"/> <br>
      <q-btn push class="nav-buttons" color="white" text-color="black" label="Groups"  @click="changePage('/')"/>
      <q-btn push class="nav-buttons" color="white" text-color="black" label="Forums"  @click="changePage('/')"/>
    </div>
  </div>
</template>

<script>
import fireBaseStorage from '../middleware/firebase/storage'
import firebaseInstance from "../middleware/firebase";
import firestoreDB from "../middleware/firebase/firestore"

export default {
  name: "Header",
  props: ['signInMode'],
  data(){
    return{
      backgroundImgURL: '',
    }
  },
  methods:{
    async googleLogin() {
      try {
        const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
        let result = await firebaseInstance.firebase.auth().signInWithPopup(provider);
        /** @type {firebase.auth.OAuthCredential} */
        let credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        window.user = user;
        await firestoreDB.modules.users.createNewUser({name:window.user.displayName, email:window.user.email})
        await this.$router.replace('/profile');

      } catch (error) {
        console.log(error);
        /*let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;*/
      }
    },

    login(){
      this.$router.replace('/login');
    },
    joinUs(){
      this.$router.replace('/signin');
    },
    changePage(path){
      this.$router.push(path);
    },
    loadAsset(fileName){
      let assetURL =  fireBaseStorage.readAsset(fileName);
      return `background-image: url(${assetURL})`;
    }
  },
  async created(){
    let assetURL = await fireBaseStorage.readAsset('header1.jpg');
    this.backgroundImgURL = `background-image: url(${assetURL})`;
  }
}
</script>

<style scoped>
.q-pa-md{
  font-family: "Berlin Sans FB";
  text-align: center;
  color: black;
  width: 100%;
  height: 900px;
}
.nav-buttons{
  padding: 10px;
  margin: 20px;
  font-size: 25px;
  width: 200px;
}
.header-button {
  background-color: black;
  color: white;
  margin: 10px;
  padding: 10px;
}

@media (max-width: 500px) {
  .q-pa-md{

  }
.nav-buttons{
  padding: 5px;
  margin: 7px;
  font-size: 10px;
  width: 100px;
}
  .title{
    font-size: 20px;
    color: #ff5000;
    font-family: "Font Awesome 5 Free";
  }
  .sub-title{
    display: none;
  }
}
</style>