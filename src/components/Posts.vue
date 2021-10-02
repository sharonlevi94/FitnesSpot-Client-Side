<template>
  <div class="q-pa-md" align="left">
    {{ this.titleName }}
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
  props: ['cardName', 'cardSettings', 'titleName'],
  data () {
    return {
      items: [ {}, {}, {}, {}, {}, {}, {} ],
      writer:''
      /*writer:[{align:'left',
        field:window.user.displayName,
        label: `${window.user.displayName} says:`,
        name:window.user.displayName,
        required: true,
        sortable: false}]*/
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
  },
  created() {
    this.writer = window.user.displayName;
  }
}
</script>

<style scoped>
.q-pa-md{
  font-size: 40px;
  font-family: "Berlin Sans FB";
}
</style>