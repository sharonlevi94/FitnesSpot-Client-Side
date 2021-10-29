<template>
  <q-layout class="q-pa-md" view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <div>
      <q-toolbar>

        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

          <q-item clickable tag="a" href="#/" align="center">

            <q-toolbar-title class="logoItem" >
              FitnessSpot
            </q-toolbar-title>
          </q-item>

        <q-item class="credit" align="right">
          <div class="credit">Developed by Sharon Levi </div>
        </q-item>

        <div>
          <q-btn  class="logout-btn" align="left" v-if="isLoggedIn()" push color="white" text-color="black" label="Logout" @click="logout()" />
        </div>

          <q-input class="search-bar" v-if="isLoggedIn()" v-model="search" filled type="search" label="Search">
            <template v-slot:append>
              <q-icon name="search" @click="searchSomething()" />
            </template>
          </q-input>

      </q-toolbar>
      </div>
    </q-header>

    <q-drawer
        v-if="isLoggedIn()"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list @click="leftDrawerOpen = !leftDrawerOpen">
        <q-item-label header>What would you like to do ?</q-item-label>

        <q-item clickable tag="a" href="#/" >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#/profile">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#/activities">
          <q-item-section avatar>
            <q-icon name="directions" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Your Activities</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#/feed">
          <q-item-section avatar>
            <q-icon name="feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Feed</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Chat with Friends</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="#/about">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://github.com/sharonlevi94">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My GitHub</q-item-label>
            <q-item-label caption>My projects</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://www.linkedin.com/in/sharon-levy-8434471a5/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My LinkedIn</q-item-label>
            <q-item-label caption>My page in LinkedIn</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>

    </q-page-container>
  </q-layout>
</template>

<!------------------------------------------------------------------------------->

<script>
import firebaseInstance from './middleware/firebase';
export default {
  name: 'LayoutDefault',

  components: {

  },

  data () {
    return {
      leftDrawerOpen: !this.$q.platform.is.desktop,
      search: '',
    }
  },
  methods:{
    async logout(){
      try{
        await firebaseInstance.firebase.auth().signOut();
        delete window.user;
        await this.$router.push('/login');
      }
      catch(error){
        console.log(error);
      }
    },
    isLoggedIn(){
      return window.user;
    },
    searchSomething(){

    }
  }
}
</script>
<!------------------------------------------------------------------------------->
<style>
.logoItem{
  font-family: "Berlin Sans FB";
}
.search-bar{
  width: 500px;
  background-color: white;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 930px;
}
.q-pa-md{
  background-color: #ffffff;
}

@media (max-width: 500px){
  .credit{
    display: none;
  }
  .search-bar{
    display: none;
  }
}
</style>
