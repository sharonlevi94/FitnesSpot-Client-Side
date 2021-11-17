<template>
  <q-page class="chat-layout">
    <q-item-label class="toolbar-title text-center bg-amber">
      ChatSpot
      <q-icon name="chat"/>
    </q-item-label>

    <q-list
        class="full-width"
        separator
        bordered>
      <q-item
          v-for="(contact, index) in users"
          :key="index" class="q-my-sm"
          clickable
          v-ripple
          :to="`/chat-room-page/${contact.id}`">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="avatars[index]">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name ? contact.name : contact.first_name + ' ' + contact.last_name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="contact.online? 'light-green-5' : 'grey-4'">
            {{ contact.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "ChatUsersPage",
  computed: mapGetters('users', ['users']),
  data() {
    return {
      localUsers: [],
      avatars: [],
    }
  },
  methods: {
    ...mapActions('users', ['getUsers', 'usersChangedListener']),

    ...mapActions('images', ['getProfilePictureById']),

    getAvatar(id) {
      return this.getProfilePictureById(id).then((downloadURL) => {
        return downloadURL
      })
    },

    setLocalUsers() {
      this.localUsers = this.users
      for (let user of this.localUsers) {
        this.getAvatar(user.id).then((downloadURL) => {
          this.avatars.push(downloadURL)
        })
      }
    },
  },
  created() {
    this.getUsers().then(() => {
      this.setLocalUsers()
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