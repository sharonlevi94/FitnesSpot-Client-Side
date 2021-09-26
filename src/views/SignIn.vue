<template>
  <div class="signnin">
    <JoinUs @addSomeThing="reloadTable()"/>
    <TableViewer :tableName="'users'" tableTitle="Users" :settings="'settings-users'" :isReload="isReload"/>
    <CardViewer  :cardName="'users'" :settingsName="'settings-users'" :isReload="isReload"/>
  </div>
</template>

<script>
// @ is an alias to /src
import JoinUs from "../components/JoinUs";
import TableViewer from "../components/TableViewer";
import CardViewer from "../components/CardViewer";


export default {
  name: 'SignIn',
  components: {
    JoinUs, TableViewer,CardViewer
  },
  data(){
    return{
      isReload: false,
    }
  },
  methods: {
    reloadTable(){
      this.isReload = !this.isReload;
    },
  }
}
</script>
