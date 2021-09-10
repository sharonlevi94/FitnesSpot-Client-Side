<template>
  <div class="q-pa-md">
    <q-table
        title="Users List"
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
  name: "Users",
  props: ['tableName'],
  data () {
    return {
      columns: [
        {
          name: 'first_name',
          required: true,
          label: 'First Name',
          align: 'left',
          field: 'first_name',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'last_name', label: 'Last Name', field: 'last_name', sortable: true },
        { name: 'user_name', label: 'User Name', field: 'user_name' },
        { name: 'password', label: 'Password', field: 'password' },
        { name: 'age', label: 'Age', field: 'age' },
        { name: 'phone_number', label: 'Phone Number', field: 'phone_number', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'address', label: 'Address', field: 'address', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'favorite_sports', label: 'Favorite Sports', field: 'favorite_sports' }
      ],
      rows: []
    }
  },
  created() {
    let users =  localStorageDriver.getObjects('grid-users');
    for(let i in users ){
      this.rows.push(users[i]);
    }
  }
}
</script>

<style scoped>

</style>