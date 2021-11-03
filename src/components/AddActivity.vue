<template>
  <div class="q-pa-md">
    <div class="join-us-title" >Add new Activity</div>

    <div class="join-us-fields">

      <q-select v-model="localEditedObj.workoutType" :options="this.activities" label="What type of activity you did?" />

      <q-input v-model="localEditedObj.date" filled type="date" hint="Date" />

      <q-input v-model="localEditedObj.time" filled type="text" hint="for how long? (hh:mm)" />

      <q-input v-model="localEditedObj.location" filled type="text" hint="Where?" />
    </div>

    <div class="join-us-fields">

      <q-input v-model="localEditedObj.calories" filled type="number" hint="How many calories? (optional)" />

      <q-select v-model="localEditedObj.difficulty" :options="this.diffLevel" label="Difficulty Level (1-10)" />

      <q-input v-model="localEditedObj.note" filled type="text" hint="Other notes" />

    </div>

    <div> <q-btn class="join-us-button" color="white" text-color="black" label="Add" @click="insert()"/> </div>
  </div>
</template>

<script>
import {mapMutations, mapActions, mapState} from 'vuex';

export default {
  name: "AddActivity",

  props: ['tableName', 'settings-add'],

  computed: mapState('activities', ['editedObj']),

  data () {
    return {
      activities: ['Soccer', 'Basketball', 'Running', 'Jogging', 'Swimming', 'Gym',
        'Volleyball', 'Golf', 'Baseball', 'Climbing'],
      diffLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      localEditedObj: {
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

    ...mapActions('activities', ['insertActivity', 'updateActivity','setEditActivityById']),

    ...mapMutations('activities', ['setEditedActivity',
      'resetEditedActivityId',
      'setEditedActivityId']),

    async insert(){
     this.fixDateTime()

      this.localToStore();
      await this.insertActivity().then(async ()=>{
        this.resetEditedActivityId();
        await this.getActivities();
        this.$q.notify({
          message: ' Activity added Successfully! ',
          color: 'green',
          icon: 'event_available',
          type: 'warning',
        })
      })
    },

    async update(){
      this.localToStore();
      await this.updateActivity();
      this.$router.go(-1);
    },

    localToStore(){
      this.setEditedActivity(this.localEditedObj);
    },

    fixDateTime(){
      let dateArr = this.localEditedObj.date.split('-');
      let dateObj = {};
      dateObj['year'] = Number(dateArr[0]);
      dateObj['month'] = Number(dateArr [1]);
      dateObj['day'] = Number(dateArr[2]);
      this.localEditedObj.date = dateObj;

      let timeArr = this.localEditedObj.time.split(':');
      let timeObj = {};
      timeObj['hours'] = Number(timeArr[0]);
      timeObj['minutes'] = Number(timeArr [1]);
      this.localEditedObj.time = timeObj;
    }
  },
  created() {
    this.setEditActivityById().then(()=>{
      Object.assign(this.localEditedObj, this.editedObj);
    })
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
 /* background-image: url("../resources/header3.jpg");*/
}

.join-us-fields{
  width: 50%;
  float: left;
  padding: 20px;
  /*  border: 2px solid red;*/
}
</style>