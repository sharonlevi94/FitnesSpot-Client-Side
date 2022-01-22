<template>
  <q-page class="text-center items-center">
    <q-banner rounded class="text-h2 bg-primary">
      <template v-slot:avatar>
        <img
            :src="profilePicURL"
            style="width: 150px; height: 140px"
        >
        <div class="title text-h3">{{ localUser.first_name + ' ' + localUser.last_name }}</div>
      </template>
      <template v-slot:action>
        <q-btn
            v-if="isMyProfile()"
            flat
            label="Settings"
            icon="settings"/>
      </template>
    </q-banner>
    <div class="row wrap justify-center q-pa-lg">
      <q-card bordered class="text-center q-pa-lg q-ma-lg">
        <UploadPhotos
            v-if="isMyProfile()"
            titleName="Change Profile Picture"
            buttonName="Change"
            hint="change your profile photo"
            :display="false"/>
        <UploadPhotos
            :titleName="isMyProfile() ? 'Your Photos'
              : `${localUser.first_name + ' ' + localUser.last_name}'s Photos`"
            buttonName="Upload"
            hint="Upload your photo"
            :display="true"
            :id="editedUserId"/>
      </q-card>
      <q-card bordered class="text-center q-pa-lg q-ma-lg">
        <q-btn class="popup-buttons" label="Workouts" color="primary" @click="dialog = true"/>
        <q-dialog v-model="dialog">
          <q-card>
            <q-card-section>
              <tableViewer
                  class="activities-popup"
                  :tableName="'activities'"
                  tableTitle="Activities"
                  :settings="'settings-activities'"/>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-btn v-if="isMyProfile()" class="popup-buttons" label="Add Workout" color="primary"
               @click="dialog2 = true"/>
        <q-dialog v-model="dialog2">
          <q-card>
            <q-card-section>
              <AddActivity :tableName="'activities'"/>
            </q-card-section>
          </q-card>
        </q-dialog>


        <WritePost/>
        <Posts :cardName="'posts'"
               :cardSettings="'settings-posts'"
               :titleName="'Posts'"
               :isUser="true"
               :userId="this.$route.params.id"/>

      </q-card>
    </div>
  </q-page>
</template>

<script>
import Posts from "../components/Posts";
import UploadPhotos from "../components/UploadPhotos";
import WritePost from "../components/WritePost";
import TableViewer from "../components/TableViewer";
import AddActivity from "../components/AddActivity";
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Profile",
  components: {
    Posts, UploadPhotos, WritePost, AddActivity, TableViewer
  },
  data() {
    return {
      dialog: false,
      dialog2: false,
      localUser: {},
      profilePicURL: ''
    }
  },
  methods: {
    ...mapActions('images', ['getProfilePictureById']),
    ...mapActions('users', ['setEditUserById', 'getUsers']),
    ...mapMutations('users', ['setEditedUserId']),
    isMyProfile() {
      return this.$route.params.id == window.user.uid
    }
  },
  computed: {
    ...mapState('users', ['editedObj', 'editedUserId']),
    ...mapState('images', ['currProfilePictureURL'])
  },
  created() {
    this.getUsers().then(() => {
      this.setEditedUserId(this.$route.params.id)
      this.setEditUserById()
      this.localUser = this.editedObj

      this.setEditedUserId(window.user.uid)
      this.setEditUserById()
      window.user.details = this.editedObj

      this.getProfilePictureById(this.$route.params.id).then((url) => {
        this.profilePicURL = url
      })
    })
  }
}
</script>

<style scoped>
.text-center {
  font-family: "Berlin Sans FB";
}

.popup-buttons {
  margin: 10px;
  padding: 5px;
  font-family: "Berlin Sans FB";
}

@media (max-width: 500px) {
  .title {
    font-family: BN United;
  }
}
</style>