<template>
  <div class="q-pa-md">
      {{this.tableTitle}}
    <q-table class="qtable"
        :title="this.tableTitle"
        :data="rows"
        :columns="columns"
        row-key="name"
        dark
        color="amber"
    >

      <template v-slot:body="props">
        <q-tr :props="props" @click="goToObj(getByValue(props.row))">
          <!--TODO: generic v-slots -->

<!--          <q-td v-for="col of columns" key="col" :props="props">
            {{props.row.col}}
          </q-td>-->

          <!-- Activities Table -->
          <q-td key="workoutType" :props="props"> {{ props.row.workoutType }} </q-td>
          <q-td key="date" :props="props"> {{ props.row.date }} </q-td>
          <q-td key="time" :props="props"> {{ props.row.time }} </q-td>
          <q-td key="location" :props="props"> {{ props.row.location }} </q-td>
          <q-td key="calories" :props="props"> {{ props.row.calories }} </q-td>
          <q-td key="difficulty" :props="props"> {{ props.row.difficulty }} </q-td>
          <q-td key="note" :props="props"> {{ props.row.note }} </q-td>

          <!-- Users Table -->
          <q-td key="first_name" :props="props"> {{ props.row.first_name }} </q-td>
          <q-td key="last_name" :props="props"> {{ props.row.last_name }} </q-td>
          <q-td key="user_name" :props="props"> {{ props.row.user_name }} </q-td>
          <q-td key="password" :props="props"> {{ props.row.password }} </q-td>
          <q-td key="age" :props="props"> {{ props.row.age }} </q-td>
          <q-td key="phone_number" :props="props"> {{ props.row.phone_number }} </q-td>
          <q-td key="address" :props="props"> {{ props.row.address }} </q-td>
          <q-td key="favorite_sports" :props="props"> {{ props.row.favorite_sports }} </q-td>

            <q-td key="actions" :props="props">
              <q-btn @click="deleteObj(getByValue(props.row))">
                Delete
              </q-btn>
            </q-td>

        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/index.js';

export default {
  name: 'TableViewer',
  props: ['tableName', 'tableTitle', 'settings', 'isReload'],
  fields: [],
  //----------------------------------------------------------
  data () {
    return {
        columns: [],
        rows: [],
    }
  },
  //---------------------------------------------------------------------------------------
  methods: {
    read(){
      this.columns = [];
      this.rows = [];
      let cols = localStorageDriver.getObjects(this.settings);
      for(let i in cols ){
        this.columns.push(cols[i]);
      }
      this.columns.push({name: "actions", label: "Actions", field: "actions"});

      let objects =  localStorageDriver.getObjects(this.tableName);
      for(let i in objects ){
        this.rows.push(objects[i]);
      }
    },

    //----------------------------------------------------------

    deleteObj(id){
      localStorageDriver.remove(this.tableName, id);
      this.read();
    },

    //----------------------------------------------------------
    getByValue(value){
      let objects =  localStorageDriver.getObjects(this.tableName);
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
.q-pa-md {
  font-size: 60px;
  font-family: "Berlin Sans FB";

}
</style>