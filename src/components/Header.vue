<template>
  <div class="header">
    <h1>Welcome to your Sport World</h1>
    <h3>Share your fitness with everyone!</h3>

    <div v-if="signInMode">
      <q-btn push class="login-button" color="black" text-color="white" label="Login" @click="login" />
      <q-btn push class="google-login-button" color="black" text-color="white" label="Sign Up"  @click="joinUs"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['signInMode'],
  methods:{
    login(){
      this.$router.replace('/');
    },
    joinUs(){
      this.$router.replace('/signin');
    }
  }
}
</script>

<style scoped>
.header{
  font-family: "Berlin Sans FB";
  text-align: center;
  background-image: url("../resources/header1.jpg");
  color: black;
  width: 100%;
  height: 900px;
}
</style>