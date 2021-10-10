<template>
    <div class="q-pa-md" :style="backgroundImgURL">
        <div class="col-6">

            <div class="about-us">
              About Us
              <div class="about-us-description">
                share your sport activities <br>
                make people more healthy <br>
                encourage workout & sportive lifestyle
              </div>
            </div>


        </div>
    </div>
</template>

<script>
import fireBaseStorage from "../middleware/firebase/storage";

export default {
name: "AboutUs",
  data(){
  return{
    backgroundImgURL:''
  }
  },
  async created(){
    let assetURL = await fireBaseStorage.readAsset('header3.jpg');
    this.backgroundImgURL = `background-image: url(${assetURL})`;
  }
}
</script>

<style scoped>
.about-us {
  text-align: center;
  font-family: "Berlin Sans FB";
  display: table;
  margin: 0 auto;
  font-size: 45px;
  color: #000000;
  width: 100%;
  height: 900px;
}
</style>