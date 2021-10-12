<template>
  <div>
    <AddActivity :tableName="'activities'"/>
    <tableViewer :tableName="'activities'"
                 tableTitle="Activities"
                 :settings="'settings-activities'"/>
  </div>
</template>

<script>
import tableViewer from '../components/TableViewer.vue';
import firebaseDataBase from '../middleware/firebase/database';
import AddActivity from "../components/AddActivity";
import {mapMutations, mapActions, mapState} from 'vuex';

export default {
  name: "Edit",
  components: {AddActivity, tableViewer},
  data() {
    return {
      editedObj: {},
      tableType: 'activities',
    }
  },
  computed: mapState('activities', ['editedActivityId', 'activities']),

  methods: {
    ...mapActions('activities', ['getActivities']),
    ...mapMutations('activities', ['setEditedActivityId', 'resetEditedActivityId', 'setEditedActivity']),

    async getObj() {
      let arr = await firebaseDataBase.read({entity: this.tableType, Id: this.$route.params.id});
      this.editedObj = arr[0];
    }
  },
  created() {
    if (this.$router.params.id) {
      console.log(this.$router.params.id);
      this.setEditedActivityId(this.$router.params.id);
    }
  }
}
</script>

<style scoped>
</style>