<template>
  <q-layout view="hhh lpr fff">
  <q-page-container>

    <div class="float-container">

      <q-header class="profile-header">
        <q-img
            :src="currProfilePictureURL"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
        />
        {{userName}}
      </q-header>

      <div class="float-child">
        <UploadPhotos titleName="Change Profile Picture"
                      buttonName="Change"
                      hint="change your profile photo"
                      :display="false"/>
        <UploadPhotos titleName="Your Photos"
                      buttonName="Upload"
                      hint="Upload your photo"
                      :display="true"/>
      </div>

      <div class="float-child">

        <div   align="center">
          <q-btn class="popup-buttons" label="Your Workouts" color="primary" @click="dialog = true"/>
          <q-dialog  v-model="dialog">
            <q-card >
              <q-card-section>
                <tableViewer :tableName="'activities'"
                             tableTitle="Activities"
                             :settings="'settings-activities'"/>
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-btn class="popup-buttons" label="Add Workout" color="primary" @click="dialog2 = true"/>
          <q-dialog  v-model="dialog2">
            <q-card >
              <q-card-section>
                <AddActivity :tableName="'activities'"/>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>

        <WritePost align="center"/>
        <Posts :cardName="'posts'"
               :cardSettings="'settings-posts'"
               :titleName="'Your Posts'"/>
      </div>

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
import { mapState } from 'vuex'

export default {
  name: "Profile",
  components: {
    Posts, UploadPhotos, WritePost, AddActivity, TableViewer
  },
  data(){
    return{
      userName: window.user.displayName,
      userEmail: window.user.email,
      dialog: false,
      dialog2: false,
    }
  },
  computed:{
    ...mapState('images', ['currProfilePictureURL'])
  },
  created() {
    console.log(this.currProfilePictureURL)
  }
}
</script>

<style scoped>
.float-container {
  border: 3px solid #fff;
  padding: 20px;
}

.float-child {
  width: 50%;
  float: left;
  padding: 20px;

}

.profile-header{
  height: 150px;
  font-size: 60px;
  font-family: "Berlin Sans FB";
}
.popup-buttons{
  margin: 10px;
  padding: 5px;
  font-family: "Berlin Sans FB";
}
</style>