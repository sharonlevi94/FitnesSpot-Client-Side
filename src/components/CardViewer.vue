<template>
  <div class="warapper" align="center">
    <div class="cards-wrapper" >
      <q-card
          class="my-card text-white"
          align="left"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
          v-for="user of rows"
      >

        <q-card-section v-for="titleValue in user" >
           {{ titleValue }}
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
  data () {
    return {
      cardSettings: [],
      rows: [],
    }
  },
  methods: {
    read(){
      this.cardSettings = [];
      this.rows = [];
      let cols = localStorageDriver.getObjects(this.settings);
      for(let i in cols ){
        this.cardSettings.push(cols[i]);
      }
     //this.columns.push({name: "actions", label: "Actions", field: "actions"});

      let objects =  localStorageDriver.getObjects(this.cardName);
     // this.rows = objects;
      for(let i in objects ){
        this.rows.push(objects[i]);
      }
    },

    //----------------------------------------------------------

    deleteObj(id){
      localStorageDriver.remove(this.cardName, id);
      this.read();
    },

    //----------------------------------------------------------
    getByValue(value){
      let objects =  localStorageDriver.getObjects(this.cardName);
      for(let key in objects){
        if(objects[key][this.settings[0]] == value[this.settings[0]])
          return key;
      }
    },
    goToObj(id){
      this.$router.push(`editedObj/${id}`);
    }
  },
  //---------------------------------------------------------------------------------------
  created(){
    this.read();
  },
  watch: {
    isReload(){
      this.read();

    }
  }
}
</script>

<style scoped>
.my-card{
  width: 300px;
  margin: 50px;
  border-radius: 30px;
  font-size: 20px;
  font-family: "Berlin Sans FB";
}
</style>