<template>
  <div class="q-pa-md">
    <q-table class="qtable"
        :title="this.tableTitle"
        :data="rows"
        :columns="columns"
        row-key="name"
        dark
        color="amber"
    />
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/index.js';
export default {
  name: 'TableViewer',
  props: ['tableName', 'tableTitle', 'settings'],
  data () {
    return {
      columns: [],
      rows: []
    }
  },
  created() {
    let cols = localStorageDriver.getObjects(this.settings);
    for(let i in cols ){
      this.columns.push(cols[i]);
    }

    let objects =  localStorageDriver.getObjects(this.tableName);
    for(let i in objects ){
      this.rows.push(objects[i]);
    }
  }
}
</script>

<style scoped>

</style>