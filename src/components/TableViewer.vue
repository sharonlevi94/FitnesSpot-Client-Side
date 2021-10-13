<template>
  <div class="q-pa-md">
      {{this.tableTitle}}
    <q-table class="qtable"
        :title="this.tableTitle"
        :data="activities"
        :columns="columns"
        row-key="name"
        dark
        color="amber"
    >

      <template v-slot:body="props">
        <q-tr :props="props" >
          <!--TODO: generic v-slots -->

            <!-- Activities Table -->
            <q-td  v-if="isToShow('activities')" key="workoutType" :props="props" @click="goToObj(props.row.id)"> {{ props.row.workoutType }} </q-td>
            <q-td v-if="isToShow('activities')" key="date" :props="props"> {{ props.row.date.day }}/{{ props.row.date.month }}/{{ props.row.date.year }} </q-td>
            <q-td v-if="isToShow('activities')" key="time" :props="props"> {{ props.row.time.hours}}:{{ props.row.time.minutes}}  </q-td>
            <q-td v-if="isToShow('activities')" key="location" :props="props"> {{ props.row.location }} </q-td>
            <q-td v-if="isToShow('activities')" key="calories" :props="props"> {{ props.row.calories }} </q-td>
            <q-td v-if="isToShow('activities')" key="difficulty" :props="props"> {{ props.row.difficulty }} </q-td>
            <q-td v-if="isToShow('activities')" key="note" :props="props"> {{ props.row.note }} </q-td>

<!--            &lt;!&ndash; Users Table &ndash;&gt;
            <q-td v-if="isToShow('users')" key="first_name" :props="props" @click="goToObj(props.row.id)"> {{ props.row.first_name }} </q-td>
            <q-td v-if="isToShow('users')" key="last_name" :props="props"> {{ props.row.last_name }} </q-td>
            <q-td v-if="isToShow('users')" key="user_name" :props="props"> {{ props.row.user_name }} </q-td>
            <q-td v-if="isToShow('users')" key="password" :props="props"> {{ props.row.password }} </q-td>
            <q-td v-if="isToShow('users')" key="email" :props="props"> {{ props.row.email }} </q-td>
            <q-td v-if="isToShow('users')" key="date_of_birth" :props="props"> {{ props.row.date_of_birth.day }}.{{ props.row.date_of_birth.month }}.{{ props.row.date_of_birth.year }} </q-td>
            <q-td v-if="isToShow('users')" key="phone_number" :props="props"> {{ props.row.phone_number }} </q-td>
            <q-td v-if="isToShow('users')" key="favorite_sports" :props="props"> {{ props.row.favorite_sports }} </q-td>-->

            <q-td key="actions" :props="props">
              <q-btn @click="deleteObj(props.row.id)">
                Delete
              </q-btn>
            </q-td>

        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapMutations, mapActions, mapState} from 'vuex';

export default {
  name: 'TableViewer',
  props: ['tableName', 'tableTitle', 'settings'],
  fields: [],
  //----------------------------------------------------------
  data () {
    return {
        columns: [],
    }
  },
  computed: mapState('activities', ['editedActivityId', 'activities']),
  methods: {
    ...mapActions('activities', ['getActivities', 'deleteActivity']),
    ...mapMutations('activities', ['setEditedActivityId', 'resetEditedActivityId']),
    async readSettings(){
      this.columns = [];
      let cols = await firebaseDataBase.readSettings({entity: this.settings});
      for(let i in cols ){
        this.columns.push(cols[i]);
      }
      this.columns.push({name: "actions", label: "Actions", field: "actions"});
    },
    goToObj(id){
      this.setEditedActivityId(id);
      this.$router.push(`editedObj/${id}`);
    },
    isToShow(table_name){
      return this.tableName == table_name;
    },
    deleteObj(id){
      this.setEditedActivityId(id);
      this.deleteActivity();
      //this.getActivities();
      this.resetEditedActivityId();
    }
  },
  created(){
    this.getActivities();
    this.readSettings();
    console.log(this.activities)
    //this.getActivityRef({entity: this.tableName});
  },
}
</script>

<style scoped>
.q-pa-md {
  font-size: 60px;
  font-family: "Berlin Sans FB";

}
</style>