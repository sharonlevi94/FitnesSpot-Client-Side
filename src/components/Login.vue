<template class="pagee">
  <div class="wrapper" align="center">
    <div class="login-wrapper">

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
            <q-input v-model="email" filled type="text" hint="Email"/>

            <q-input v-model="password" filled type="password" hint="Password"/>
          </div>
        </q-card-section>

        <q-card-section>
            <q-btn push class="login-button" color="white" text-color="black" label="Login" @click="login()"/>
        </q-card-section>
        <q-card-section>
          <div class="forgot-button">
            <q-btn push text-color="white" label="forgot password?"/>
          </div>
        </q-card-section>
      </q-card>

    </div>
  </div>

</template>

<script>
import firebaseInstance from '../middleware/firebase';

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
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  width: 290px;
  height: 600px;
  font-family: "Berlin Sans FB";
}
.wrapper {
  background-color: #773b3b;
}
</style>