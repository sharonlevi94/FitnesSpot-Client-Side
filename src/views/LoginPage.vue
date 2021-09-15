<template>
  <div class="wrapper" align="center">
    <div class="login_box"><Login /></div>
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: "LoginPage",
  components:{
    Login
  }
}
</script>

<style scoped>
.wrapper{
  background-color: #9cc0ea;
  height: 810px;
}

</style>