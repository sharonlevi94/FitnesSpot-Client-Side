<template class="pagee">
  <div class="wrapper" align="center">
    <div class="login-wrapper">

      <q-card
          class="my-card text-black"
      >
        <q-card-section>
          <div class="text-h6">Login</div>
          {{ lorem }}
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="login-fields">
            <q-input v-model="email" filled type="text" hint="Email"/>

            <q-input v-model="password" filled type="password" hint="Password"/>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn push class="login-button" color="white" text-color="black" label="Login" @click="login()"/>
          <q-btn push class="login-button" color="white" text-color="black" label="Google" @click="googleLogin()"/>
        </q-card-section>
        <q-card-section>
          <div class="forgot-button">
            <q-btn push text-color="black" label="forgot password?"/>
          </div>
        </q-card-section>
      </q-card>

    </div>
  </div>

</template>

<script>
import firebaseInstance from '../middleware/firebase';
import firestoreDB from "../middleware/firebase/firestore";

export default {
  name: "Login",
  data() {
    return {
      lorem: 'Enter your user name & password to login:',
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        console.log(`email: ${this.email}, password: ${this.password}`);
        let userCredential = await firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        // Signed in
        let user = userCredential.user;
        window.user = user;
        console.log(user);
        await this.$router.push('/');
      } catch (error) {
        console.log(error)
        /* let errorCode = error.code;
         let errorMessage = error.message;*/
      }
    },
    async googleLogin(){
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
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  width: 290px;
  font-family: "Berlin Sans FB";
}
</style>