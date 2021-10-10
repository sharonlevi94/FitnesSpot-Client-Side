<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper">
      <q-card
          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #ffffff 0%, #949494 100%);
                width: 500px;">

        <q-card-section v-if="!isId(cardObj, titleValue)" v-for="titleValue in cardObj" >
          <div class="sectionTitle" v-if="isPost()"> {{userName}} says: </div>
          <div class="sectionTitle" v-else> {{settings[counter]}}: </div>

          <div v-if="isObj(titleValue)" v-for="item in titleValue">{{item}}</div>
          <div v-if="!isObj(titleValue)">{{ titleValue }}</div>

          {{increase()}}

        </q-card-section>

        <q-card-section>
          <div>
            <q-btn @click="deleteObj(cardObj.id)">Delete</q-btn>
            <q-btn push class="post-buttons" :icon="loadIcon('like.png')"/>
            <q-btn push class="post-buttons" :icon="loadIcon('comment.png')"/>
          </div>
        </q-card-section>
      </q-card>

      <div class="commentParent">
        <q-input outlined class="commentChild1" v-model="comment" label="Left a comment..." align="center"/>
        <q-btn class="commentChild2" align="center">Comment</q-btn>
      </div>

    </div>
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapMutations, mapActions, mapState} from 'vuex';
import fireBaseStorage from "../middleware/firebase/storage";

export default {
  name: "CardViewer",
  props: ['cardObj','cardName', 'settingsName'],
  data() {
    return {
      settings: [],
      counter: 0,
      userName:'',
      comment: '',
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
      if(this.counter < this.settings.length){
        this.counter++;
        console.log(this.counter);
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
    },
    async loadIcon(iconName){
      let assetURL = await fireBaseStorage.readAsset(iconName);
      console.log(assetURL);
      return `img:${assetURL}`;
    }
  },
  //---------------------------------------------------------------------------------------
  async created() {
    await this.readSettings();
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  margin: 10px;
  border-radius: 30px;
  font-size: 20px;
  font-family: "Berlin Sans FB";
}
.sectionTitle{
  color: #000000;
}

.commentChild1{
  width: 500px;
}
.commentChild2{
  width: 100px;
}
</style>