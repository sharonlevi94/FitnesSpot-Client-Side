<template>
  <div class="warapper"align="center">
    <div class="login-wrapper" >

      <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
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
          <div> <q-btn push class="login-button" color="white" text-color="black" label="Login" /> </div>
        </q-card-section>
        <q-card-section >
          <div class="forgot-button"> <q-btn push  text-color="white" label="forgot password?" /> </div>
        </q-card-section>
      </q-card>

    </div>
  </div>

</template>

<script>
export default {
name: "Login",
  data () {
    return {
      lorem: 'Enter your user name & password to login:',
      user_name: '',
      password: '',
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