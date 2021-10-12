<template>
  <q-layout view="hhh lpr fff">
  <q-page-container>

    <div class="float-container">

      <q-header class="profile-header">
        <q-img
            :src="profilePictureURL"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
            @click="uploadProfilePic()"
        />
        {{userName}}
      </q-header>

      <div class="float-child">
        <UploadPhotos titleName="Your Photos"
                      buttonName="Upload"
                      hint="Upload your photo"
                      :display="true"/>
        <UploadPhotos titleName="Change Profile Picture"
                      buttonName="Change"
                      hint="change your profile photo"
                      :display="false"/>
      </div>

      <div class="float-child">
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
import firebaseStorage from '../middleware/firebase/storage';

export default {
  name: "Profile",
  components: {
    Posts, UploadPhotos, WritePost
  },
  data(){
    return{
      userName: window.user.displayName,
      profilePictureFile: null,
      profilePictureURL: 'https://placeimg.com/500/300/nature',
    }
  },
  methods:{
    async uploadProfilePic(){
      await firebaseStorage.uploadProfilePicture(this.profilePictureFile);
      await this.$router.replace('/profile');
    },
    async readProfilePicture(){
      this.profilePictureURL = await firebaseStorage.readProfilePicture();
    }
  },
  created() {
    this.readProfilePicture();
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
</style>