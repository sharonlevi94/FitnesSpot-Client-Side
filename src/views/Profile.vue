<template>
  <q-layout view="lhh Lpr fFf">
    <q-page-container class="float-container">
      <q-banner rounded class="text-h2 bg-primary">
        <template v-slot:avatar>
          <img
              :src="profilePicURL"
              style="width: 150px; height: 140px"
          >
        </template>

        <div class="title text-h3">{{ localUser.first_name + ' ' + localUser.last_name }}</div>

        <template v-slot:action>
          <q-btn
              v-if="isMyProfile()"
              flat
              label="Settings"
              icon="settings"/>
        </template>
      </q-banner>

      <div class="float-child">
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
      </div>

      <div class="float-child">

        <div align="center">
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
        </div>

        <WritePost align="center"/>
        <Posts :cardName="'posts'"
               :cardSettings="'settings-posts'"
               :titleName="'Posts'"
               :isUser="true"
               :userId="this.$route.params.id"/>
      </div>
    </q-page-container>
  </q-layout>
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

.float-container {
  border: 3px solid #fff;
  padding: 20px;
  display: grid;
  width: 100%;
}

.float-child {
  width: 50%;
  float: left;
  padding: 20px;

}
.popup-buttons {
  margin: 10px;
  padding: 5px;
  font-family: "Berlin Sans FB";
}

@media (max-width: 500px) {
  .float-container {
    display: grid;
    align-items: start;
  }

  .float-child {
    width: 100%;

  }
}

.activities-popup {
  width: 1000px;
}
.title{
  font-family: BN United;
}
</style>