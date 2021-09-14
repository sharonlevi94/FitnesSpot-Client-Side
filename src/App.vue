<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          FitnessSpot

        </q-toolbar-title>

        <div>Developed by Sharon Levi</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>What would you like to do ?</q-item-label>

        <q-item clickable tag="a" href="/about">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Your Activities</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Feed</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Chat with Friends</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Groups</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://github.com/sharonlevi94">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My GitHub</q-item-label>
            <q-item-label caption>My projects</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://www.linkedin.com/in/sharon-levy-8434471a5/">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My LinkedIn</q-item-label>
            <q-item-label caption>My page in LinkedIn</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <Home/>
      <Posts :cardName="'table_posts'" :cardSettings="'posts-settings'"/>
      <Login/>
      <JoinUs/>
      <TableViewer :tableName="'grid-users'" tableTitle="Users" settings='settings-users'/>
      <CardViewer  :cardName="'grid-users'" settings='settings-users'/>

    </q-page-container>
  </q-layout>
</template>

<!------------------------------------------------------------------------------->

<script>
import Home from "./views/Home";
import Header from './components/Header.vue'
import About from "./views/About";
import JoinUs from "./components/JoinUs";
import Login from "./components/Login";
import TableViewer from "./components/TableViewer";
import CardViewer from "./components/CardViewer";
import Posts from "./components/Posts";

export default {
  name: 'LayoutDefault',

  components: {
    About,
    JoinUs, Login, Home, Header, TableViewer, CardViewer, Posts
  },

  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>
<!------------------------------------------------------------------------------->
<style>
</style>
