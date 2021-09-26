<template>
  <div class="warapper"align="center">
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
            <q-input v-model="user_name" filled type="text" hint="User Name" />

            <q-input v-model="password" filled type="password" hint="Password" />
          </div>
        </q-card-section>

        <q-card-section>
          <div> <q-btn push class="login-button" color="white" text-color="black" label="Login" @click="login()" /> </div>
        </q-card-section>
        <q-card-section >
          <div class="forgot-button"> <q-btn push  text-color="white" label="forgot password?" /> </div>
        </q-card-section>
      </q-card>

    </div>
  </div>

</template>

<script>
import firebaseInstance from '../middleware/firebase'

export default {
name: "Login",
  data () {
    return {
      lorem: 'Enter your user name & password to login:',
      user_name: '',
      password: '',
    }
  },
  methods: {
    login (){
      const provider = new firebaseInstance.auth.GoogleAuthProvider();
      firebaseInstance.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }
}
</script>
<style scoped>
.login-wrapper{
width: 290px;
  font-family: "Berlin Sans FB";
}
</style>