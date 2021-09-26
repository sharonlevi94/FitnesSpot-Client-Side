<template>
  <div class="myActivities">
    <AddActivity :tableName="'activities'" @addSomeThing="reloadTable()"/>
    <tableViewer :tableName="'activities'" tableTitle="Activities" :settings="'settings-activities'" :isReload="isReload"/>
  </div>
</template>

<script>
import AddActivity from "../components/AddActivity";
import TableViewer from "../components/TableViewer";

export default {
  name: 'Activities',
  components: {
    AddActivity, TableViewer
  },
  data(){
    return{
      isReload: false,
    }
  },
  methods: {
    reloadTable(){
      this.isReload = !this.isReload;
    }
  }
}
</script>
