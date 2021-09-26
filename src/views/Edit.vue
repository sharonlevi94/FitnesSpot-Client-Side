<template>
  <div>
    <AddActivity :tableName="tableType"
                 :editedActivity="editedObj"
                 :objId="getId()"></AddActivity>
    <tableViewer :tableName="'activities'" tableTitle="Activities" settings='settings-activities'/>
  </div>
</template>

<script>
import tableViewer from '../components/TableViewer.vue';
import localStorageDriver from '../middleware/local-storage/index.js';
import api from '../middleware/api/index.js';
import AddActivity from "../components/AddActivity";

export default {
name: "Edit",
  components:{
  AddActivity, tableViewer
  },
  data(){
  return{
    editedObj:{},
    tableType: 'activities',
  }
  },
 methods: {
  getId() {
    return this.$route.params.id;
  },
   async getObj(){
    this.editedObj =await api.read({entity: this.tableType,id: this.$route.params.id})
   }
 },
  created() {
     this.getObj();
  }
}
</script>

<style scoped>

</style>