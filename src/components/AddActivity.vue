<template>
  <div class="q-pa-md">
    <div class="join-us-title" >Add new Activity</div>

    <div class="join-us-fields">

      <q-select v-model="editedObj.workoutType" :options="this.activities" label="What type of activity you did?" />

      <q-input v-model="editedObj.date" filled type="date" hint="Date" />

      <q-input v-model="editedObj.time" filled type="text" hint="for how long?" />

      <q-input v-model="editedObj.location" filled type="text" hint="Where?" />

    </div>

    <div class="join-us-fields">

      <q-input v-model="editedObj.calories" filled type="number" hint="How many calories? (optional)" />

      <q-select v-model="editedObj.difficulty" :options="this.diffLevel" label="Difficulty Level (1-10)" />

      <q-input v-model="editedObj.note" filled type="text" hint="Other notes" />

    </div>

    <div> <q-btn  v-if="!editedActivity" class="join-us-button" color="white" text-color="black" label="Add" @click="insert()"/> </div>
    <div> <q-btn  v-if="editedActivity" class="join-us-button" color="white" text-color="black" label="Update" @click="update(objId)"/> </div>
  </div>
</template>

<script>
import localStorageDrive from '../middleware/local-storage/index.js';
import tableViewer from './TableViewer.vue';

export default {
  name: "AddActivity",
  props: ['tableName', 'settings-add', 'editedActivity', 'objId'],

  data () {
    return {
      activities: ['Soccer', 'Basketball', 'Running', 'Jogging', 'Swimming', 'Gym', 'Volleyball', 'Golf', 'Baseball', 'Climbing'],
      diffLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      editedObj: {
        workoutType: '',
        date: '',
        time: '',
        location: '',
        calories: '',
        difficulty: '',
        note: ''
      }
    }
  },
  methods: {
    insert(){
      localStorageDrive.insert(this.tableName, this.editedObj);
      this.$emit('addSomeThing');
    },
    update(id){
      localStorageDrive.update(this.tableName, id, this.editedObj);
      this.$router.push(`/`);
    }
  },
  created() {
    if(this.editedActivity){
      this.editedObj = this.editedActivity;
    }
  }
}
</script>

<style scoped>
.join-us-title{
  font-family: "Berlin Sans FB";
  font-size: 50px;
  margin-left: 20px;
}
.join-us-button{
  margin: 20px;

}

.q-pa-md{
  border: 3px solid #fff;
  padding: 20px;
}

.join-us-fields{
  width: 50%;
  float: left;
  padding: 20px;
  /*  border: 2px solid red;*/
}
</style>