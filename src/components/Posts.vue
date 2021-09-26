<template>
  <div class="q-pa-md" align="center">
    News Feed
    <q-infinite-scroll @load="onLoad" :offset="250">
      <CardViewer :cardName="this.cardName" :settingsName="this.cardSettings"/>
      <div v-for="(item, index) in items" :key="index" class="caption">

      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>

    </q-infinite-scroll>
  </div>
</template>

<script>
import CardViewer from "./CardViewer";
export default {
  name: "Posts",
  components: {CardViewer},
  props: ['cardName', 'cardSettings'],
  data () {
    return {
      items: [ {}, {}, {}, {}, {}, {}, {} ]
    }
  },
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2000)
    },
    check(){
      console.log(this.cardName)
      console.log((this.cardSettings))
    }
  }
}
</script>

<style scoped>
.q-pa-md{
  font-size: 60px;
  font-family: "Berlin Sans FB";
}
</style>