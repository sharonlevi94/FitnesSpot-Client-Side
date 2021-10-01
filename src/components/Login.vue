<template class="pagee">
  <div class="wrapper"align="center">
    <div class="login-wrapper" >

      <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #e37c47 0%, #ee5700 100%)"
      >
        <q-card-section>
          <div class="text-h6">Login</div>
          {{ lorem }}
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="login-fields">
            <q-input v-model="email" filled type="text" hint="Email" />

            <q-input v-model="password" filled type="password" hint="Password" />
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <q-btn push class="login-button" color="white" text-color="black" label="Login" @click="login()" />
            <q-btn push class="google-login-button" label="Google" @click="googleLogin()" />
          </div>
        </q-card-section>
        <q-card-section >
          <div class="forgot-button"> <q-btn push  text-color="white" label="forgot password?" /> </div>
        </q-card-section>
      </q-card>

    </div>
  </div>

</template>

<script>
import firebaseInstance from '../middleware/firebase';

export default {
name: "Login",
  data () {
    return {
      lorem: 'Enter your user name & password to login:',
      email: '',
      password: '',
    }
  },
  methods: {
    async googleLogin (){
      try{
        const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
        let result = await firebaseInstance.firebase.auth().signInWithPopup(provider);
        /** @type {firebase.auth.OAuthCredential} */
        let credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        window.user = user;
        await this.$router.push('/');
      }
      catch(error){
        console.log(error);
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
      }
    },
    async login(){
      try{
        console.log(`email: ${this.email}, password: ${this.password}`);
        let userCredential = await firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        // Signed in
        let user = userCredential.user;
        window.user = user;
        await this.$router.push('/');
      }
      catch(error){
        let errorCode = error.code;
        let errorMessage = error.message;
      }
    }
  }
}
</script>

<style scoped>
.login-wrapper{
width: 290px;
  font-family: "Berlin Sans FB";
}
.google-login-button{
  background-color: black;
  color: white;
}
.wrapper{
  background-color: #773b3b;
}
</style>