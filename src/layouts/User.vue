<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Covid
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- (Optional) The Footer -->
    <q-footer>
      <q-tabs dense  class="bg-white text-primary q-pa-xs">
        <q-route-tab
          :to="{ name: 'App Dashboard', query: { account: user._id } }"
          no-caps
          icon="home"
          replace
          label="Home"
        />
        <q-route-tab
          no-caps
          icon="assignment"
          :to="{ name: 'App Cases', query: { account: user._id } }"
          active-class="bg-grey"
          replace
          label="Reports"
        />
        <q-route-tab
          :to="{ name: 'App Notification' }"
          no-caps
          icon="notifications"
          replace
          label="Alerts"
        />
        <q-route-tab
          no-caps
          icon="account_circle"
          :to="{ name: 'App Profile' }"
          replace
          label="Profile"
        />
      </q-tabs>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      :width="200"
      bordered
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit">
        <q-list separator>
          <q-item :to="{ name: 'App Dashboard', query: { account: user._id } }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item :to="{ name: 'App Cases', query: { account: user._id } }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>Reports</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'App Notification' }">
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>
            <q-item-section>Notifications</q-item-section>
          </q-item>
          <q-item :to="{ name: 'App Profile' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>Profile</q-item-section>
          </q-item>
          <q-item @click="logUserOut" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { decode } from 'js-base64'
export default {

  data () {
    return {
      user: {},
      leftDrawer: true
    }
  },

  methods: {
    logUserOut () {
      this.$q.localStorage.remove('sessionid')
      this.$router.push({ name: 'Home' })
    }
  },

  mounted () {
    this.user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
  }
}
</script>
