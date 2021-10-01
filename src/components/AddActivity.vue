<template>
  <div class="q-pa-md">
    <div class="join-us-title" >Add new Activity</div>

    <div class="join-us-fields">

      <q-select v-model="editedObj.workoutType" :options="this.activities" label="What type of activity you did?" />

      <q-input v-model="editedObj.date" filled type="date" hint="Date" />

      <q-input v-model="editedObj.time" filled type="text" hint="for how long? (hh:mm)" />

      <q-input v-model="editedObj.location" filled type="text" hint="Where?" />

    </div>

    <div class="join-us-fields">

      <q-input v-model="editedObj.calories" filled type="number" hint="How many calories? (optional)" />

      <q-select v-model="editedObj.difficulty" :options="this.diffLevel" label="Difficulty Level (1-10)" />

      <q-input v-model="editedObj.note" filled type="text" hint="Other notes" />

    </div>

    <div> <q-btn  v-if="!editedActivity" class="join-us-button" color="white" text-color="black" label="Add" @click="insert()"/> </div>
    <div> <q-btn  v-if="editedActivity" class="join-us-button" color="white" text-color="black" label="Update" @click="update()"/> </div>
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';

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
    async insert(){
      let dateArr = this.editedObj.date.split('-');
      let dateObj = {};
      dateObj['year'] = Number(dateArr[0]);
      dateObj['month'] = Number(dateArr [1]);
      dateObj['day'] = Number(dateArr[2]);
      this.editedObj.date = dateObj;

      let timeArr = this.editedObj.time.split(':');
      let timeObj = {};
      timeObj['hours'] = Number(timeArr[0]);
      timeObj['minutes'] = Number(timeArr [1]);
      this.editedObj.time = timeObj;

      await firebaseDataBase.create({entity: this.tableName,item: this.editedObj});

      this.$emit('addSomeThing');

    },
    async update(){
      console.log(this.editedObj);
      await firebaseDataBase.update({entity: this.tableName,
                                            id: this.objId,
                                            new: this.editedObj });
      this.$router.go(-1);
    }
  },
  async created() {
    let asd = await this.editedActivity;
    if(asd){
      this.editedObj = asd;
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