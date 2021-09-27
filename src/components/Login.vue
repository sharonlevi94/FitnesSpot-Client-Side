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
import { getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword } from "firebase/auth";

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
    googleLogin (){
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            window.user = user;
            this.$router.push('/home');
            // ...
          }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    },
    async login(){
      const auth = getAuth();
      try{
        let userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        window.user = user;
        await this.$router.push('/home');
      }
      catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
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
</style>