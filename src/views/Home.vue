<template>
  <div class="home bg-orange-1">
    <Header :signInMode="signInMode" />
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: 'Home',
  components: {
     Header
  },
  data(){
    return{
      signInMode: true,
    }
  },
  created(){
    if(window.user){
      this.signInMode = false;
    }
    else{
      this.signInMode = true;
    }
  }
}
</script>
