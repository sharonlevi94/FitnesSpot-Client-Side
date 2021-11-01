<template>
  <div class="q-layout block">

    <q-input class="search-users" v-model="search" filled type="search" label="Search friend">
      <template v-slot:after>
        <q-btn round dense flat icon="search" @click="searchSomething"/>
      </template>
    </q-input>

    <q-table
        grid
        title="Friends"
        :data="localUsers"
        :columns="settings"
        row-key="name"
        title-class="text-h5 text-bold text-black-9"
        card-class="text-bold"
        :pagination="initialPagination"
        card-style="border-radius: 2em; box-shadow: rgba(255, 168, 19, 0.50) 0px 1px 2px 0px; border:none; padding: 2em"
        bordered
        flat
    />
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Users',
  computed: mapState('users', ['users']),
  data() {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      },
      isReload: false,
      localUsers: [],
      settings: [],
      search: '',
    }
  },
  methods: {
    ...mapActions('users', ['getUsers']),

    reloadTable() {
      this.isReload = !this.isReload;
    },

    async getAllUsers() {
      await this.getUsers()
      this.localUsers = this.users
    },

    async readSettings() {
      let cols = await firebaseDataBase.readSettings({entity: 'settings-users'});
      for (let i in cols) {
        this.settings.push(cols[i]);
      }
      //this.settings.push({name: "actions", label: "Actions", field: "actions"});
    },

    searchSomething() {

    }
  },
  created() {
    this.getAllUsers()
    this.readSettings()

  }
}
</script>

<style>
.search-users {
  width: 500px;
  background-color: white;
  border-radius: 20px;
}
</style>
