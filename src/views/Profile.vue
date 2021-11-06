<template>
  <q-layout view="hhh lpr fff">
    <q-page-container class="float-container">
      <q-header class="profile-header">
        <q-img
            :src="profilePicURL"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
        />
        {{ localUser.first_name + ' ' + localUser.last_name }}
      </q-header>

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
      console.log(this.localUser)
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
  display: flex;
  width: 100%;
}

.float-child {
  width: 50%;
  float: left;
  padding: 20px;

}

.profile-header {
  height: 150px;
  font-size: 60px;
  font-family: "Berlin Sans FB";
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

  .profile-header {
    font-size: 30px;
    width: 100%;
  }
}

.activities-popup {
  width: 1000px;
}
</style>