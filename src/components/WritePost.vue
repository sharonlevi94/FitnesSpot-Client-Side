<template>
  <div class="q-pa-md">
    What is on your mind?

    <div class="q-gutter-y-md column" style="max-width: 500px">
      <q-input
          v-model="content"
          filled
          clearable
          type="textarea"
          color="red-12"
          label="share your fitness life here "
          hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
          :shadow-text="textareaShadowText"
          @keydown="processTextareaFill"
          @focus="processTextareaFill"
      />
    </div>

    <q-btn @click="add()">
      Post
    </q-btn>

  </div>

</template>

<script>
import {event} from 'quasar'
import {mapActions, mapMutations, mapState} from "vuex";

const {stopAndPrevent} = event

export default {
  name: "WritePost",
  data() {
    return {
      content: '',
      textareaFillCancelled: false
    }
  },
  computed: {
    ...mapState('posts', ['editedObj', 'posts']),
    textareaShadowText () {
      if (this.textareaFillCancelled === true) {
        return ''
      }

      const
          t = 'This text\nwill be filled\non multiple lines\nwhen you press TAB',
          empty = typeof this.content !== 'string' || this.content.length === 0

      if (empty === true) {
        return t.split('\n')[0]
      }
      else if (t.indexOf(this.content) !== 0) {
        return ''
      }

      return t
          .split(this.content)
          .slice(1)
          .join(this.content)
          .split('\n')[0]
    }
  },
  methods: {
    ...mapActions('posts', ['insertPost', 'updatePost','getPosts']),

    ...mapMutations('posts', ['setEditedPost','resetEditedPostId']),

    async add() {
      await this.setEditedPost({content: this.content, likes:0, comments:[]});
      await this.insertPost({content: this.content, likes:0, comments:[]});
      //this.resetEditedPostId()
      //await this.getPosts();
    },

    processTextareaFill (e) {
      if (e === void 0) {
        return
      }

      if (e.keyCode === 27) {
        if (this.textareaFillCancelled !== true) {
          this.textareaFillCancelled = true
        }
      }
      else if (e.keyCode === 9) {
        if (this.textareaFillCancelled !== true && this.textareaShadowText.length > 0) {
          stopAndPrevent(e)
          this.content = (typeof this.content === 'string' ? this.content : '') + this.textareaShadowText
        }
      }
      else if (this.textareaFillCancelled === true) {
        this.textareaFillCancelled = false
      }
    }
  }
}
</script>

<style scoped>
.q-pa-md {
  font-size: 40px;
  font-family: "Berlin Sans FB";
  width: 100%;
}
</style>