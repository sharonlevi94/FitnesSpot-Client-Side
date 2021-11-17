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
        v-if="!otherUserDetails.online"
        class="bg-grey-4 text-center">
        {{ contact.online ? `${otherUserDetails.first_name} is online` : `${otherUserDetails.first_name} is offline` }}
    </q-banner>

    <div class="q-pa-md column col justify-end">
      <q-chat-message
          v-for="message of localMessages"
          :key="message.text"
          :name="message.from"
          :avatar="message.avatar"
          :text="[message.text]"
          :sent="!isThisMe(message.from)"
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
      contact: '',
      localMessages: [],
      myDetails: {},
      otherUserDetails: {}
    }
  },
  computed: {
    ...mapState('users', ['users', 'editedObj']),
    ...mapState('images', ['currProfilePictureURL']),
    ...mapState('chat', ['messages', 'editedMessage']),
  },
  methods: {
    ...mapActions('images', ['getProfilePictureById']),
    ...mapActions('chat', ['insertMessage', 'getMessages']),
    ...mapMutations('chat', ['setEditedMessage']),
    ...mapMutations('users', ['setEditedUserId']),
    ...mapActions('users', ['setEditUserById','getUserDetails']),
    goBack() {
      this.$router.replace('/chat-users');
    },

    async sendMessage() {
      await this.setEditedMessage({
        text: this.newMessage,
        from: this.myDetails.first_name + ' ' + this.myDetails.last_name,
        avatar: this.profilePic
      })
      await this.insertMessage(this.$route.params.otherUserId)
      this.newMessage = ''
    },

    isThisMe(from) {
      return from === this.myDetails.first_name + ' ' + this.myDetails.last_name
    }
  },
  created() {
    this.setEditedUserId(this.$route.params.otherUserId)
    this.setEditUserById()
    this.contact = this.editedObj
    this.getMessages(this.$route.params.otherUserId).then(()=>{
      this.localMessages = this.messages
    })
    this.getUserDetails(window.user.uid).then((res)=>{
      this.myDetails = res
    })

    this.getUserDetails(this.$route.params.otherUserId).then((res)=>{
      this.otherUserDetails = res
    })

    this.getProfilePictureById(window.user.uid).then((res) => {
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