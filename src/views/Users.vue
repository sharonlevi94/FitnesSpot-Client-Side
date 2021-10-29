<template>
  <div class="users">
    <TableViewer :tableName="'users'" tableTitle="Users" :settings="'settings-users'" :isReload="isReload"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TableViewer from "../components/TableViewer";

export default {
  name: 'Users',
  components: {
     TableViewer
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
