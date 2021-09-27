<template>
  <div class="home">
    <Header :signInMode="true"/>
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
      isReload: false,
    }
  },
  methods: {
    reloadTable(){
      this.isReload = !this.isReload;
    }
  }
}
</script>
