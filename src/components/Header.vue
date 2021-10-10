<template>
  <div class="q-pa-md" :style="backgroundImgURL">
    <h1>Welcome to FitnesSpot</h1>
    <h3>Share your fitness with everyone!</h3>

    <div v-if="signInMode">
      <q-btn push class="login-button" color="black" text-color="white" label="Login" @click="login" />
      <q-btn push class="google-login-button" color="black" text-color="white" label="Sign Up"  @click="joinUs"/>
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

export default {
  name: "Header",
  props: ['signInMode'],
  data(){
    return{
      backgroundImgURL: '',
    }
  },
  methods:{
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
</style>