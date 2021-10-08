<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper">
      <q-card
          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #000000 0%, #000000 100%);
                width: 500px;
                "
          v-for="post of posts"
      >

        <q-card-section v-if="!isId(post, titleValue)" v-for="titleValue in post" >
          <div class="sectionTitle" v-if="isPost()"> {{userName}} says: </div>
          <div class="sectionTitle" v-else> {{settings[counter]}}: </div>

          <div v-if="isObj(titleValue)" v-for="item in titleValue">{{item}}</div>
          <div v-if="!isObj(titleValue)">{{ titleValue }}</div>

          {{increase()}}

        </q-card-section>

        <q-card-section>
          <q-btn @click="deleteObj(post.id)">
            Delete
          </q-btn>
        </q-card-section>

      </q-card>

    </div>
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapMutations, mapActions, mapState} from 'vuex';

export default {
  name: "CardViewer",
  props: ['cardName', 'settingsName'],
  data() {
    return {
      settings: [],
      rows: [],
      counter: 0,
      userName:''
    }
  },
  computed: mapState('posts', ['editedPostId', 'posts']),
  methods: {
    ...mapActions('posts', ['getPosts', 'deletePost']),

    ...mapMutations('posts', ['setEditedPostId']),

    async readSettings() {
      this.settings = [];
      let cols = await firebaseDataBase.readSettings({entity:this.settingsName});
      for (let i in cols) {
        this.settings.push(cols[i]['label']);
      }
    },

     deleteObj(id) {
      this.setEditedPostId(id);
      this.deletePost();
      this.getPosts();
    },

    goToObj(id) {
      this.$router.push(`editedObj/${id}`);
    },

    increase(){
        this.counter++;
      if(this.counter == this.settings.length){
        this.counter = 0;
      }
    },

    isId(obj, value){
      return obj.id == value;
    },

    isObj(item){
      return (typeof item) === 'object'
    },

    isPost(){
      if(this.cardName == 'posts'){
        this.userName = window.user.displayName;
        return true;
      }
      return false;
    }
  },
  //---------------------------------------------------------------------------------------
  async created() {
    await this.getPosts();
    await this.readSettings();
  }
}
</script>

<style scoped>
.my-card {
  width: 500px;
  margin: 30px;
  border-radius: 30px;
  font-size: 20px;
  font-family: "Berlin Sans FB";
}
.sectionTitle{
  color: gray;
}

</style>