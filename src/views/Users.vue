<template>
  <div class="q-layout block">

    <q-input class="search-users" v-model="search" filled type="search" label="Search friend">
      <template v-slot:after>
        <q-btn round dense flat icon="search" @click="searchSomething"/>
      </template>
    </q-input>

    <template>

      <div class="q-pa-md" style="width: 100%">
        <q-list bordered v-for="(user, index) in localUsers" :key="index">
          <q-item clickable v-ripple :to="`/profile/${user.id}`">
            <q-item-section>{{user.first_name+ ' '+ user.last_name}}</q-item-section>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </div>
    </template>
  </div>
</template>

<script>
import firebaseDataBase from '../middleware/firebase/database';
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Users',
  computed: mapGetters('users', ['users']),
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
    ...mapActions('images', ['getProfilePictureById']),
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

    },

    getAvatar(id) {
      return this.getProfilePictureById(id).then((downloadURL) => {
        return downloadURL
      })
    },
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
