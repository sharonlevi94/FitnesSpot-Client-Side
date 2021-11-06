<template>
  <q-page class="flex column">
    <q-item-label elevated class="toolbar-title bg-amber-9">
      <div class="toolbar-title-btn">
        <q-btn
            icon="arrow_back"
            label="Back"
            flat
            dense
            @click="goBack()"
        />
      </div>

      <div class="toolbar-title-text">
        ChatSpot
        <q-icon name="chat"/>
      </div>
    </q-item-label>

    <q-banner
        class="bg-grey-4 text-center">
      {{ contact.online ? 'User is online' : 'User is offline' }}
    </q-banner>

    <div class="q-pa-md column col justify-end">
      <q-chat-message
          v-for="message in messages"
          :key="message.text"
          :name="message.from"
          :avatar="message.avatar"
          :text="[message.text]"
          :sent="message.from === 'me'"
          stamp="7 minutes ago"
      />
    </div>

    <q-footer elevated>
      <q-toolbar class="glossy">
        <q-form
            @submit="sendMessage"
            class="full-width">
            <q-input
                bg-color="white"
                outlined
                rounded
                bottom-slots
                v-model="newMessage"
                label="Write a message"
                dense>

              <template v-slot:before>
                <q-avatar><img :src="profilePic"></q-avatar>
              </template>

              <template v-slot:append>
                <q-icon
                    v-if="newMessage !== ''"
                    name="close"
                    @click="newMessage = ''"
                    @submit="newMessage = ''"
                    class="cursor-pointer"/>
              </template>

              <template v-slot:after>
              </template>

              <template v-slot:after>
                <q-btn
                round
                dense
                flat
                @click="sendMessage"
                icon="send"
                color="white"/>
              </template>
            </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "ChatRoomPage",
  data() {
    return {
      newMessage: '',
      dense: false,
      profilePic: '',
      contact:'',
    }
  },
  computed: {
    ...mapState('users', ['users','editedObj']),
    ...mapState('images', ['currProfilePictureURL']),
    ...mapState('chat',['messages','editedMessage'])
  },
  methods: {
    ...mapActions('images', ['getProfilePictureById']),
    ...mapActions('chat', ['insertMessage', 'getMessages']),
    ...mapMutations('chat', ['setEditedMessage']),
    ...mapMutations('users',['setEditedUserId']),
    ...mapActions('users',['setEditUserById']),
    goBack() {
      this.$router.replace('/chat-users');
    },

    async sendMessage() {
      console.log(window.user)
      await this.setEditedMessage({
        text: this.newMessage,
        from: window.user.details.first_name + ' ' + window.user.details.last_name ,
        avatar: this.profilePic
      })
      await this.insertMessage(this.$route.params.otherUserId)
      this.newMessage=''
    }
  },
  mounted() {
    this.setEditedUserId(this.$route.params.otherUserId)
    this.setEditUserById()
    this.contact = this.editedObj
    this.getMessages(this.$route.params.otherUserId)
  },
  created() {
    this.getProfilePictureById(window.user.uid).then((res) => {
      console.log(res)
      this.profilePic = res
    })
  }
}
</script>

<style scoped>
.toolbar-title {
  font-family: fantasy;
  width: 100%;
  font-size: x-large;
  display: flex;
  flex-direction: row;
}

.toolbar-title-text {
  width: 50%;
}

.toolbar-title-btn {
  width: 40%;
}
</style>