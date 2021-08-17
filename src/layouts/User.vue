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
      <q-tabs dense  class="bg-white text-primary">
        <q-route-tab
          :to="{ name: 'App Dashboard' }"
          no-caps
          icon="home"
          replace
          label="Home"
        />
        <q-route-tab
          no-caps
          icon="assignment"
          :to="{ name: 'App Cases' }"
          active-class="bg-grey"
          replace
          label="Cases"
        />
        <q-route-tab
          :to="{ name: 'App Profile' }"
          no-caps
          icon="poll"
          replace
          label="Analysis"
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
          <q-item :to="{ name: 'App Dashboard' }" clickable v-ripple>
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item :to="{ name: 'App Cases' }" clickable v-ripple>
            <q-item-section>View Cases</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'App Profile' }">
            <q-item-section>Analysis</q-item-section>
          </q-item>
          <q-item :to="{ name: 'App Profile' }" clickable v-ripple>
            <q-item-section>Profile</q-item-section>
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
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
