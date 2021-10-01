<template>
  <div>
    <AddActivity :tableName="tableType"
                 :editedActivity="this.editedObj"
                 :objId="this.$route.params.id"></AddActivity>
    <tableViewer :tableName="'activities'" tableTitle="Activities" settings='settings-activities'/>
  </div>
</template>

<script>
import tableViewer from '../components/TableViewer.vue';
import firebaseDataBase from '../middleware/firebase/database';
import AddActivity from "../components/AddActivity";

export default {
  name: "Edit",
  components: {
    AddActivity, tableViewer
  },
  data() {
    return {
      editedObj: {},
      tableType: 'activities',
    }
  },
  methods: {
    getId() {
      return this.$route.params.id;
    },
    async getObj() {
      let options = {entity: this.tableType, Id: this.$route.params.id};
      let arr = await firebaseDataBase.read(options);
      this.editedObj = arr[0];
    }
  },
  async created() {
    await this.getObj();
    console.log(this.editedObj);
  }
}
</script>

<style scoped>

</style>