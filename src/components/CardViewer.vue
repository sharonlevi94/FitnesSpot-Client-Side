<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper">
      <q-card
          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
          v-for="user of rows"
      >

        <q-card-section v-for="titleValue in user" >
          {{cardSettings[counter]}}: <br>
          {{ titleValue }}
          {{increase()}}
          <br>
        </q-card-section>


      </q-card>

    </div>
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/index.js';

export default {
  name: "CardViewer",
  props: ['cardName', 'settings'],
  data() {
    return {
      cardSettings: [],
      rows: [],
      counter: 0,
    }
  },
  methods: {
    read() {
      this.cardSettings = [];
      this.rows = [];
      let cols = localStorageDriver.getObjects(this.settings);
      for (let i in cols) {
        this.cardSettings.push(cols[i]['label']);
      }
      //this.columns.push({name: "actions", label: "Actions", field: "actions"});

      let objects = localStorageDriver.getObjects(this.cardName);
      // this.rows = objects;
      for (let obj of objects) {
        this.rows.push(obj);
      }
    },

    //----------------------------------------------------------

    deleteObj(id) {
      localStorageDriver.remove(this.cardName, id);
      this.read();
    },
    //----------------------------------------------------------
    goToObj(id) {
      this.$router.push(`editedObj/${id}`);
    },
    //----------------------------------------------------------
    increase(){
        this.counter++;
      if(this.counter == this.cardSettings.length){
        this.counter = 0;
      }
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
  margin: 50px;
  border-radius: 30px;
  font-size: 20px;
  font-family: "Berlin Sans FB";
}
</style>