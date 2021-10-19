<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper" v-for="post of posts">

      <!--Post Content-->
      <q-card
          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #ff0303 0%, #ff6a0d 100%);
                width: 500px;">

        <q-card-section>
<!--            <q-avatar>
              <img :src="getAuthorImage(post.authorId)">
            </q-avatar>-->

          <div class="sectionTitle" v-if="isPost()"> {{ post.author }} says:</div>
          <div>{{ post.content }}</div>
        </q-card-section>

        <q-card-section>
          <div>
            <q-btn push class="post-buttons"
                   icon="img:https://firebasestorage.googleapis.com/v0/b/fitnesspot-10d17.appspot.com/o/assets%2Fdelete.png?alt=media&token=272b9639-e56b-4f61-b259-6e2906537429"
                   @click="deleteObj(post.id)"
                   v-if="isBelong(post.id)"/>
            <q-btn push class="post-buttons"
                   icon="img:https://firebasestorage.googleapis.com/v0/b/fitnesspot-10d17.appspot.com/o/assets%2Flike.png?alt=media&token=bbf24394-9b02-4cf5-a064-69f69703b6c8"
                   @click="like(post.id)"
            />
            <q-btn push class="post-buttons"
                   icon="img:https://firebasestorage.googleapis.com/v0/b/fitnesspot-10d17.appspot.com/o/assets%2Fcomment.png?alt=media&token=5cad8e5f-d33a-429e-8aae-bed65f666e2a"
                   @click="commentDialog = true"
            />
            {{ post.likes }} likes
          </div>
        </q-card-section>

      </q-card>

     <!--Write A Comment-->
      <div class="comment-parent" align="center" style="width: 530px">
        <q-input outlined bottom-slots v-model="post.currComment" label="left your comment here" :dense="dense">
          <template v-slot:before>
            <q-avatar>
              <img :src="currProfilePictureURL">
            </q-avatar>
          </template>

          <template v-slot:append>
            <q-icon v-if="post.currComment !== ''" name="close" @click="post.currComment = ''" class="cursor-pointer" />
          </template>

          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="leftComment(post.id, post.currComment)"/>
          </template>
        </q-input>
      </div>

      <!--View Comments-->
      <q-dialog v-model="commentDialog" transition-show="rotate" transition-hide="rotate">
        <q-card dark bordered class="bg-grey-9 my-card" v-for="comment of post.comments">
          <q-card-section>
              <q-avatar>
                <img :src="comment.image">
              </q-avatar>

              {{comment.author}}

          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            {{ comment.content }}
          </q-card-section>
        </q-card>
      </q-dialog>
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
      dense: false,
      commentDialog: false,
      authorImage: '',
    }
  },
  computed: {
    ...mapState('posts', ['editedObj', 'editedPostId', 'posts', 'currComment']),
    ...mapState('images', ['currProfilePictureURL'])
  },
  methods: {
    ...mapActions('posts', ['getPosts', 'deletePost', 'updatePost', 'setEditPostById','getPost']),

    ...mapActions('images',['getProfilePicture','getProfilePictureById']),

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

    async leftComment(id, currComment) {
      await this.setEditedPostId(id);
      await this.setEditPostById();
      let localObj = {}

      Object.assign(localObj, this.editedObj)
      let comment = {
        author: window.user.displayName,
        image: this.currProfilePictureURL,
        content: currComment
      }

      localObj.comments.push(comment)
      //reset current comment
      await this.setEditedPost(localObj);
      await this.updatePost();
    },

    async isBelong(id) {
      let post = await this.getPost(id)
      return post.authorId == window.user.uid
    },

    getAuthorImage(id){
      return this.getProfilePictureById(id).then((image)=>{
        return image;
      })
    },
  },
  created() {
    this.getProfilePicture()
  }
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

.comment-parent{
  border: 3px solid #fff;
  padding: 5px;
}
.comment-child{
  width: 32%;
  float: left;
  padding: 5px;
}
</style>