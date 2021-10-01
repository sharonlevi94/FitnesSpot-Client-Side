<template>
  <div class="float-container">

    <div class="float-child">
      <UploadPhotos/>
    </div>

    <div class="float-child">
      <Posts :cardName="'posts'" :cardSettings="'settings-posts'" :titleName="'Your Posts'"/>
    </div>

  </div>
</template>

<script>
import Posts from "../components/Posts";
import UploadPhotos from "../components/UploadPhotos";

export default {
  name: "Profile",
  components: {
    Posts, UploadPhotos
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
</style>