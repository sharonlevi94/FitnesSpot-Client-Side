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

    <q-banner class="bg-grey-4 text-center">
      User is offline.
    </q-banner>

    <div class="q-pa-md column col justify-end">
      <q-chat-message
          v-for="message in messages"
          :key="message.text"
          :name="message.from"
          :avatar="message.avatar"
          :text="[message.text]"
          :sent="message.from == 'me' ? true : false"
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
import {mapState, mapActions} from 'vuex'

export default {
  name: "ChatHomePage",
  data() {
    return {
      newMessage: '',
      dense: false,
      profilePic: '',
      messages: [
        {
          text: 'Hello there! ',
          from: 'me',
          avatar: this.profilePic
        },
        {
          text: 'Hi! Whats up with you?',
          from: 'Avital'
        },
        {
          text: 'Im fine, tnx!',
          from: 'me',
          avatar: this.profilePic
        }
      ]
    }
  },
  computed: mapState('images', ['currProfilePictureURL']),
  methods: {
    ...mapActions('images', ['getProfilePictureById']),
    goBack() {
      this.$router.push('/chat-users');
    },
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me',
        avatar: this.profilePic
      })
      this.newMessage=''
    }
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