<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper" v-for="post of posts">
      <q-card

          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #ff0303 0%, #ff6a0d 100%);
                width: 500px;">

        <q-card-section>
          <div class="sectionTitle" v-if="isPost()"> {{ userName }} says:</div>
          <div>{{ post.content }}</div>
        </q-card-section>

        <q-card-section>
          <div>
            <q-btn push class="post-buttons"
                   icon="img:https://firebasestorage.googleapis.com/v0/b/fitnesspot-10d17.appspot.com/o/assets%2Fdelete.png?alt=media&token=272b9639-e56b-4f61-b259-6e2906537429"
                   @click="deleteObj(post.id)"
                   v-if="isBelong()"/>
            <q-btn push class="post-buttons"
                   icon="img:https://firebasestorage.googleapis.com/v0/b/fitnesspot-10d17.appspot.com/o/assets%2Flike.png?alt=media&token=bbf24394-9b02-4cf5-a064-69f69703b6c8"
                   @click="like(post.id)"
            />
            <q-btn push class="post-buttons"
                   icon="img:https://firebasestorage.googleapis.com/v0/b/fitnesspot-10d17.appspot.com/o/assets%2Fcomment.png?alt=media&token=5cad8e5f-d33a-429e-8aae-bed65f666e2a"
                   @click="leftComment(post.id)"
            />
            {{ post.likes }} likes
          </div>
        </q-card-section>

      </q-card>

      <div >
        <q-input outlined class="commentChild1"
                 :v-model="currComment"
                 label="Left a comment..."
                 align="center"/>
      </div>

    </div>
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapMutations, mapActions, mapState} from 'vuex';

export default {
  name: "CardViewer",
  props: ['cardObj', 'cardName', 'settingsName'],
  data() {
    return {
      settings: [],
      counter: 0,
      userName: '',
      comment: '',
    }
  },
  computed: mapState('posts', ['editedObj', 'editedPostId', 'posts', 'currComment']),
  methods: {
    ...mapActions('posts', ['getPosts', 'deletePost', 'updatePost', 'setEditPostById']),

    ...mapMutations('posts', ['setEditedPostId', 'setEditedPost', 'resetEditedPostId']),

    async readSettings() {
      this.settings = [];
      let cols = await firebaseDataBase.readSettings({entity: this.settingsName});
      for (let i in cols) {
        this.settings.push(cols[i]['label']);
      }
    },

    deleteObj(id) {
      this.setEditedPostId(id);
      this.deletePost();
      this.getPosts();
      this.resetEditedPostId();
    },
    isPost() {
      if (this.cardName === 'posts') {
        this.userName = window.user.displayName;
        return true;
      }
      return false;
    },
    async like(id) {
      await this.setEditedPostId(id);
      await this.setEditPostById();
      let localObj = {}
      Object.assign(localObj, this.editedObj)
      localObj.likes++;
      await this.setEditedPost(localObj);
      await this.updatePost();
    },
    async leftComment(id) {
      await this.setEditedPostId(id);
      await this.setEditPostById();
      let localObj = {}
      Object.assign(localObj, this.editedObj)
      localObj.comments.push(this.currComment)
      //reset current comment
      await this.setEditedPost(localObj);
      await this.updatePost();
    },
    isBelong() {
      //This method check if some content belong to certain user
      return true;
    }
  },
  //---------------------------------------------------------------------------------------

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

.sectionTitle {
  color: #000000;
}

.commentChild1 {
  width: 500px;
  border-radius: 30px;
}
</style>