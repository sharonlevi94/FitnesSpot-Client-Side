<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper">
      <q-card
          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #9d9999 0%, #434141 100%)"
          v-for="row of rows"
      >

        <q-card-section v-if="!isId(row, titleValue)" v-for="titleValue in row" >
          <div class="sectionTitle"> {{settings[counter]}} </div>

          <div v-if="isObj(titleValue)" v-for="item in titleValue">{{item}}</div>
          <div v-if="!isObj(titleValue)">{{ titleValue }}</div>

          {{increase()}}

        </q-card-section>


      </q-card>

    </div>
  </div>
</template>

<script>
import api from '../middleware/api/index.js';

export default {
  name: "CardViewer",
  props: ['cardName', 'settingsName', 'isReload'],
  data() {
    return {
      settings: [],
      rows: [],
      counter: 0,
    }
  },
  methods: {
    async read() {
      this.settings = [];
      this.rows = [];
      let cols = await api.read({entity:this.settingsName, settings: true});
      for (let i in cols) {
        this.settings.push(cols[i]['label']);
      }

      let objects = await api.read({entity:this.cardName});
        for (let obj of objects) {
          this.rows.push(obj);
        }
    },

    //----------------------------------------------------------

    async deleteObj(id) {
      await api.remove({entity: this.cardName, objId: id});
      this.read();
    },
    //----------------------------------------------------------
    goToObj(id) {
      this.$router.push(`editedObj/${id}`);
    },
    //----------------------------------------------------------
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
    }
  },
  //---------------------------------------------------------------------------------------
  created() {
    this.read();
  },
  watch: {
    isReload() {
      this.read();

    }
  }
}
</script>

<style scoped>
.my-card {
  width: 300px;
  margin: 30px;
  border-radius: 30px;
  font-size: 20px;
  font-family: "Berlin Sans FB";
}
.sectionTitle{
  color: black;
}

</style>