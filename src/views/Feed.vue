<template>
  <div class="home">
    <Header/>
    <Posts :cardName="'posts'" :cardSettings="'settings-posts'" :titleName="'News Feed'"/>
  </div>
</template>

<script>
import Posts from "../components/Posts";


export default {
  name: 'Feed',
  components: {
     Posts
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
