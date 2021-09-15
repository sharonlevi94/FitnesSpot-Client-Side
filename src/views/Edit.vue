<template>
  <div>
    <AddActivity :tableName="tableType"
                 :editedActivity="editedObj"
                 :objId="getId()"></AddActivity>
    <tableViewer :tableName="'table-activities'" tableTitle="Activities" settings='settings-activities'/>
  </div>
</template>

<script>
import tableViewer from '../components/TableViewer.vue';
import localStorageDriver from '../middleware/local-storage/index.js';
import AddActivity from "../components/AddActivity";

export default {
name: "Edit",
  components:{
  AddActivity, tableViewer
  },
  data(){
  return{
    editedObj:{},
    tableType: 'table-activities',
  }
  },
 methods: {
  getId() {
    return this.$route.params.id;
  },
   getObj(){
     this.editedObj = localStorageDriver.getObjById(this.tableType, this.$route.params.id);
   }
 },
  created() {
     this.getObj();
  }
}
</script>

<style scoped>

</style>