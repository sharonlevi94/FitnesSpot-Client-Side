<template>
  <div class="q-pa-md">
    <div class="join-us-title" >Add new Activity</div>

    <div class="join-us-fields">

      <q-select v-model="workoutType" :options="activities" label="What type of activity you did?" />

      <q-input v-model="date" filled type="date" hint="Date" />

      <q-input v-model="time" filled type="time" hint="for how long?" />

      <q-input v-model="location" filled type="password" hint="Where?" />

    </div>

    <div class="join-us-fields">

      <q-input v-model="calories" filled type="text" hint="How many calories? (optional)" />

      <q-select v-model="difficulty" :options="diffLevel" label="Difficulty Level (1-10)" />

      <q-input v-model="note" filled type="text" hint="Other notes" />

    </div>

    <div> <q-btn push class="join-us-button" color="white" text-color="black" label="Add" /> </div>
  </div>
</template>

<script>
export default {
  name: "AddActivity",
  data () {
    return {
      activities: ['Soccer', 'Basketball', 'Running', 'Jogging', 'Swimming', 'Gym', 'Volleyball', 'Golf', 'Baseball', 'Climbing'],
      diffLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      workoutType: '',
      date: '',
      time: '',
      location: '',
      calories: '',
      difficulty: '',
      note: ''
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