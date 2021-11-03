<template>
  <div class="q-page-container">
    <q-card dark bordered class="bg-grey-9 my-card scroll-y"
            v-for="(comment,index) in localPost.comments"
            :key="index"
    style="width: 500px; border-radius: 5px; margin: 10px">
      <q-card-section>
        <q-avatar>
          <img :src="comment.image">
        </q-avatar>

        {{ comment.author }}

      </q-card-section>

      <q-separator dark inset/>

      <q-card-section>
        {{ comment.content }}
      </q-card-section>
    </q-card>
  </div>

</template>

<script>
import { mapActions, mapState} from 'vuex';

export default {
  name: "Comments",
  data(){
    return{
      localPost:{}
    }
  },
  computed: {
    ...mapState('posts', ['editedComments', 'editedPostId','editedObj']),
  },
  methods:{
    ...mapActions('posts',['getPost','setEditPostById'])
  },
  created() {
    this.setEditPostById()
    this.localPost = this.editedObj
    //Object.assign(this.localPost, this.editedObj)
  }
}
</script>

<style scoped>

</style>