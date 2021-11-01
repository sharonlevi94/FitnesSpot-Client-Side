<template>
  <div class="q-pa-md">
    {{ this.tableTitle }}
    <q-table
        :title="this.tableTitle"
        :data="localActivities"
        :columns="columns"
        row-key="name"
        card-class="text-bold"
        dark
        color="amber"
        bordered
        flat
    >

      <template v-slot:body="props">
        <q-tr :props="props" @click="editActivity(props.row.id)">

          <q-td key="workoutType" :props="props">
            {{ props.row.workoutType }}
          </q-td>

          <q-td key="date" :props="props">
            {{ props.row.date.day }}/{{ props.row.date.month }}/{{ props.row.date.year }}
          </q-td>

          <q-td key="time" :props="props">
            {{ props.row.time.hours }}:{{ props.row.time.minutes }}
          </q-td>

          <q-td key="location" :props="props">
            {{ props.row.location }}
          </q-td>

          <q-td key="calories" :props="props">
            {{ props.row.calories }}
          </q-td>

          <q-td key="difficulty" :props="props">
            {{ props.row.difficulty }}
          </q-td>

          <q-td key="note" :props="props">
            {{ props.row.note }}
          </q-td>

          <q-td key="actions" :props="props">
            <q-btn @click="deleteObj(props.row.id)">
              <q-icon name="delete"/>
            </q-btn>
          </q-td>

        </q-tr>
      </template>

    </q-table>

    <q-dialog v-model="popUpEdit">
      <EditActivity />
    </q-dialog>

  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapMutations, mapActions, mapState} from 'vuex';
import EditActivity from "./EditActivity";

export default {
  name: 'TableViewer',
  props: ['tableName', 'tableTitle', 'settings'],
  fields: [],
  components:{
    EditActivity
  },
  //----------------------------------------------------------
  data() {
    return {
      columns: [],
      localActivities: [],
      popUpEdit: false,
    }
  },
  computed: mapState('activities', ['editedActivityId', 'activities','editedObj']),
  methods: {
    ...mapActions('activities', ['getActivities', 'deleteActivity','setEditActivityById']),
    ...mapMutations('activities', ['setEditedActivityId', 'resetEditedActivityId']),
    async readSettings() {
      this.columns = [];
      let cols = await firebaseDataBase.readSettings({entity: this.settings});
      for (let i in cols) {
        this.columns.push(cols[i]);
      }
      this.columns.push({name: "actions", label: "Actions", field: "actions"});
    },
    goToObj(id) {
      this.setEditedActivityId(id);
      this.$router.push(`editedObj/${id}`);
    },
    isToShow(table_name) {
      return this.tableName == table_name;
    },
    deleteObj(id) {
      this.setEditedActivityId(id);
      this.deleteActivity();
      //this.getActivities();
      this.resetEditedActivityId();
    },
    editActivity(id) {
      console.log(id)
      this.setEditedActivityId(id)
      this.setEditActivityById()

      this.$q.dialog({
        component: EditActivity,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
                      // ("this" points to your Vue component)
                      // (prop was called "root" in < 1.1.0 and
                      // still works, but recommending to switch
                      // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'something',
        // ...more.props...
      }).onOk( () => {
         this.getActivities().then(()=>{
           this.localActivities = this.activities
         })
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  },
  created() {
    this.getActivities().then(()=>{
      this.localActivities = this.activities
      this.readSettings();
    })
  },
}
</script>

<style scoped>
.q-pa-md {
  font-size: 60px;
  font-family: "Berlin Sans FB";

}
</style>