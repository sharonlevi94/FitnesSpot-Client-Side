<template>
  <div class="q-pa-sm bg-orange-1" >
    <div v-if="isLoggedIn">
      <h1 class="title">Welcome to FitnesSpot</h1>
      <h3 class="sub-title">Share your fitness with everyone!</h3>
    </div>
    <div v-if="!isLoggedIn()">
      <q-card >
        <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="sign up" label="Sign Up" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <Login/>
          </q-tab-panel>

          <q-tab-panel name="sign up">
            <JoinUs/>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
    <div v-else>
      <q-btn push class="nav-buttons" align="center" color="black"
             text-color="white" label="Profile" @click="changePage(`/profile/${getMyId()}`)" />
      <q-btn push class="nav-buttons" color="black"
             text-color="white" label="News Feed"  @click="changePage('/feed')"/> <br>
      <q-btn push class="nav-buttons" color="black"
             text-color="white" label="Workouts"  @click="changePage('/activities')"/>
      <q-btn push class="nav-buttons" color="black"
             text-color="white" label="Chat"  @click="changePage('/chat-users')"/> <br>
      <q-btn push class="nav-buttons" color="black"
             text-color="white" label="Groups"  @click="changePage('/')"/>
      <q-btn push class="nav-buttons" color="black"
             text-color="white" label="Forums"  @click="changePage('/')"/>
    </div>
  </div>
</template>

<script>
import fireBaseStorage from '../middleware/firebase/storage'
import JoinUs from "./JoinUs";
import Login from "./Login";

export default {
  name: "Header",
  components:{
    JoinUs, Login
  },
  props: ['signInMode'],
  data(){
    return{
      backgroundImgURL: '',
      tab: 'login',
    }
  },
  methods:{
    changePage(path){
      this.$router.push(path);
    },
    loadAsset(fileName){
      let assetURL =  fireBaseStorage.readAsset(fileName);
      return `background-image: url(${assetURL})`;
    },
    isLoggedIn(){
      return window.user;
    },
    getMyId(){
      let myId = window.user.uid
      return myId
    }
  },
  async created(){
    let assetURL = await fireBaseStorage.readAsset('header1.jpg');
    this.backgroundImgURL = `background-image: url(${assetURL})`;
  }
}
</script>

<style scoped>
.q-pa-sm{
  font-family: BN United;
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
@media (max-width: 500px) {
.nav-buttons{
  padding: 5px;
  margin: 7px;
  font-size: 10px;
  width: 100px;
}
  .title{
    font-size: 20px;
    color: #ff5000;
    font-family: "Berlin Sans FB";

  }
  .sub-title{
    display: none;
  }
}
</style>