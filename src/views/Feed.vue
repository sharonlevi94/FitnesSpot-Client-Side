<template>
  <div class="home">
    <WritePost align="center"/>
    <Posts :cardName="'posts'" :cardSettings="'settings-posts'" :titleName="'News Feed'"/>
<!--    <CardViewer
        v-for="post of posts"
        :cardObj="post"
        :cardName="'posts'"
        :settingsName="'settings-posts'"/>-->
  </div>
</template>

<script>
import Posts from "../components/Posts";
import WritePost from "../components/WritePost";


export default {
  name: 'Feed',
  components: {
     Posts, WritePost
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
