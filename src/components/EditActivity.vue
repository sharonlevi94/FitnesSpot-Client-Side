<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

      <q-card-section class="q-item text-center">
        <p class="text-h5">Edit Activity</p>
      </q-card-section>

      <q-card-section class="select text-center q-gutter-sm" style="max-width: 600px; width: 80%; margin: 1em auto;">
        <q-select v-model="editedActivity.workoutType" :options="this.activities" label="What type of activity you did?" />

        <q-input v-model="editedActivity.date" filled type="date" hint="Date" />

        <q-input v-model="editedActivity.time" filled type="text" hint="for how long? (hh:mm)" />

        <q-input v-model="editedActivity.location" filled type="text" hint="Where?" />

        <q-input v-model="editedActivity.calories" filled type="number" hint="How many calories? (optional)" />

        <q-select v-model="editedActivity.difficulty" :options="this.diffLevel" label="Difficulty Level (1-10)" />

        <q-input v-model="editedActivity.note" filled type="text" hint="Other notes" />
      </q-card-section>

      <q-card-section align="right" style="max-width: 600px; width: 80%; margin: 1em auto;">
        <q-btn color="primary" @click="onOKClick()" label="Edit"/>
        <q-btn color="primary" @click="onCancelClick()" label="Cancel"/>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "EditActivity",
  data() {
    return {
      activities: ['Soccer', 'Basketball', 'Running', 'Jogging', 'Swimming', 'Gym',
        'Volleyball', 'Golf', 'Baseball', 'Climbing'],
      diffLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      editedActivity:{
        workoutType: '',
        date:'',
        time: '',
        location: '',
        calories: '',
        difficulty: '',
        note: ''
      },
    }
  },
  computed: mapState('activities', ['editedObj']),
  methods: {
    ...mapActions('activities', ['updateActivity']),
    ...mapMutations('activities',['setEditedActivityId','setEditedActivity']),

    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    async onOKClick() {
      this.$q.loading.show({
        message: "Update activity, please wait..."
      })
      await this.fixDateTime()
      console.log(this.editedActivity)
      await this.setEditedActivity(this.editedActivity)
      await this.updateActivity().then(async ()=>{
        this.$q.loading.hide()
        this.$q.notify({
          message: ' Activity updated Successfully! ',
          color: 'green',
          icon: 'event_available',
          type: 'warning',
        })
      })
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },

    fixDateTime() {
      let dateArr = this.editedActivity.date.split('-');
      let dateObj = {};
      dateObj['year'] = Number(dateArr[0]);
      dateObj['month'] = Number(dateArr [1]);
      dateObj['day'] = Number(dateArr[2]);
      this.editedActivity.date = dateObj;

      let timeArr = this.editedActivity.time.split(':');
      let timeObj = {};
      timeObj['hours'] = Number(timeArr[0]);
      timeObj['minutes'] = Number(timeArr [1]);
      this.editedActivity.time = timeObj;
    }
  },
  created() {
    this.editedActivity = this.editedObj
   // Object.assign(this.editedActivity, this.editedObj)
    console.log(this.editedActivity)
  }
}
</script>

<style scoped>
.q-dialog-plugin{
  width: 1000px;
}
</style>