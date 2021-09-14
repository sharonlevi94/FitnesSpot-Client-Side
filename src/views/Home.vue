<template>
  <div class="home">
    <Header/>
    <AddActivity :tableName="'table-activities'" @addSomeThing="reloadTable()"/>
    <TableViewer :tableName="'table-activities'" tableTitle="Activities" settings='settings-activities' :isReload="isReload"/>
  </div>
</template>

<script>
import Header from "../components/Header";
import AddActivity from "../components/AddActivity";
import TableViewer from "../components/TableViewer";

export default {
  name: 'Home',
  components: {
    AddActivity, TableViewer, Header
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
