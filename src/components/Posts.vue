<template>
  <div class="q-pa-md justify-center">
    {{ this.titleName }}
    <q-infinite-scroll @load="onLoad" :offset="250">
      <CardViewer
          :cardName="cardName"
          :settingsName="cardSettings"
          :id="userId"/>

      <template v-slot:loading>
        <div class="row">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>

    </q-infinite-scroll>
  </div>
</template>

<script>
import CardViewer from "./CardViewer";
import {mapMutations, mapActions, mapState} from 'vuex';

export default {
  name: "Posts",
  components: {CardViewer},
  props: ['cardName', 'cardSettings', 'titleName', 'isUser', 'userId'],
  data() {
    return {
      items: [{}, {}, {}, {}, {}, {}, {}],
      iconImgUrl: ''
    }
  },
  computed: mapState('posts', ['editedPostId', 'posts']),
  methods: {
    ...mapActions('posts', ['getPosts', 'deletePost']),

    ...mapMutations('posts', ['setEditedPostId']),

    onLoad(index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2000)
    },
  },
  created() {
    let userOptions = {
      isUser: this.isUser,
      id: this.userId
    }
    this.getPosts(userOptions)
  }
}
</script>

<style scoped>
.q-pa-md {
  font-size: 40px;
  font-family: "Berlin Sans FB";
}
</style>