<template>
  <div class="home">
    <Header :signInMode="signInMode" />
    <Posts v-if="!signInMode" :cardName="'posts'" :cardSettings="'settings-posts'" :titleName="'News Feed'"/>
  </div>
</template>

<script>
import Header from "../components/Header";
import Posts from "../components/Posts";

export default {
  name: 'Home',
  components: {
     Header, Posts
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
