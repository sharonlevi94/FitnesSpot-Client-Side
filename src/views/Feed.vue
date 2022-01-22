<template>
  <q-page class="q-pa-md text-center items-center">
    <div class="row wrap justify-center">
      <q-card
          bordered
          style="width: 700px; max-width: 700px"
      >
        <WritePost/>
        <q-card>
          <Posts :cardName="'posts'"
                 :cardSettings="'settings-posts'"
                 :titleName="'News Feed'"
                 :isUser="false"/>

        </q-card>

      </q-card>
    </div>
  </q-page>
</template>

<script>
import Posts from "../components/Posts";
import WritePost from "../components/WritePost";

export default {
  name: 'Feed',
  components: {
    Posts, WritePost
  },
  data() {
    return {
      isReload: false,
    }
  },
  methods: {
    reloadTable() {
      this.isReload = !this.isReload;
    }
  }
}

</script>

<style lang="scss">
</style>