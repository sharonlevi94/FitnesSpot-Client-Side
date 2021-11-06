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
          <q-btn push class="login-button" color="white" text-color="black" label="Google" @click="loginGoogle()"/>
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
import { mapActions } from 'vuex'

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
    ...mapActions('users',['loginUser', 'googleLogin']),
    async login() {
      await this.loginUser({
        email: this.email,
        password: this.password
      })
      await this.$router.push(`/profile/${window.user.uid}`);
    },
    async loginGoogle(){
      await this.googleLogin().then(()=>{
         this.$router.push(`/profile/${window.user.uid}`);
      })

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