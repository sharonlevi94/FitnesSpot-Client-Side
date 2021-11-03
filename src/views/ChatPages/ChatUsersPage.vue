<template>
  <q-page class="chat-layout">
    <q-item-label class="toolbar-title bg-amber">
      ChatSpot
      <q-icon name="chat"/>
    </q-item-label>

    <q-list
        class="full-width"
        separator
        bordered>
      <q-item v-for="(contact, index) in localUsers" :key="index" class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="avatars[index]">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="contact.online? 'light-green-5' : 'grey-4'">
            {{ contact.online? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "ChatUsersPage",
  computed: mapState('users', ['users']),
  data() {
    return {
      localUsers: [],
      avatars: [],
    }
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    ...mapActions('images', ['getProfilePictureById']),
    getAvatar(id) {
      return this.getProfilePictureById(id).then((downloadURL) => {
        return downloadURL
      })
    }
  },
  created() {
    this.getUsers().then(() => {
      this.localUsers = this.users
      console.log(this.localUsers)
      for (let user of this.localUsers) {
        user.online = false;
        this.getAvatar(user.id).then((downloadURL) => {
          console.log(user.id)
          console.log(downloadURL)
          this.avatars.push(downloadURL)
        })
      }
      console.log(this.localUsers)
    })
  }
}
</script>

<style scoped>
.toolbar-title {
  font-family: fantasy;
  width: 100%;
  text-align: center;
  font-size: x-large;
}
</style>