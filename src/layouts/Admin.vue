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
          Covid Report
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- (Optional) The Footer -->
    <q-footer>

      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 text-center">
          &copy; Covid Report {{ new Date().getFullYear() }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
      :width="200"
      :breakpoint="500"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit">
        <q-list bordered separator>
          <q-item :to="{ name: 'Admin Dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item :to="{ name: 'Admin Feedback' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>Feedback</q-item-section>
          </q-item>

          <q-item :to="{ name: 'Accounts' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>Accounts</q-item-section>
          </q-item>

<!--          <q-item :to="{ name: 'Disease & Symptom Options' }" clickable v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="group" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>User Options</q-item-section>-->
<!--          </q-item>-->

          <q-item :to="{ name: 'Admin Cases' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>Cases</q-item-section>
          </q-item>

          <q-item :to="{ name: 'Administrators' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>Administrators</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
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
