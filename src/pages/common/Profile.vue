<template>
  <q-page padding>
    <q-list separator bordered>
      <q-item clickable v-ripple>
        <q-item-section>Edit Profile</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="dialog.changePassword = !dialog.changePassword">
        <q-item-section>Change Password</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>Feedback</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>Technical Support</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="dialog.about = !dialog.about">
        <q-item-section>About the Developer</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="dialog.about" maximized>
      <q-card>
        <q-toolbar>
          <q-btn round flat dense icon="person" @click="dialog.about = !dialog.about"/>
          <q-toolbar-title>About the Developer</q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-card-section>
          <q-list bordered separator>
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="phone" />
              </q-item-section>

              <q-item-section>
                <q-item-label>+2348165734509</q-item-label>
                <q-item-label caption>Mobile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="email" />
              </q-item-section>

              <q-item-section>
                <q-item-label>ffabdullahi@gmail.com</q-item-label>
                <q-item-label caption>Email Address</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="phone" />
              </q-item-section>

              <q-item-section>
                <q-item-label>+2348165734509</q-item-label>
                <q-item-label caption>WhatsApp Messenger</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.changePassword" maximized>
      <q-card>
        <q-toolbar>
          <q-btn round flat dense icon="person" @click="dialog.changePassword = !dialog.changePassword"/>
          <q-toolbar-title>Change Password</q-toolbar-title>
        </q-toolbar>
        <q-card-section>
          <q-form @submit.prevent="changePassword">
            <q-input
              v-model.trim="password.old"
              type="password"
              label="Old Password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in old password']"
            />
            <q-input
              v-model.trim="password.new"
              type="password"
              label="New Password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in new password']"
            />
            <q-input
              v-model.trim="password.confirm"
              type="password"
              label="Confirm Password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in confirm password']"
            />
            <q-btn
              type="submit"
              label="Change Password"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.editProfile" maximized></q-dialog>
    <q-dialog v-model="dialog.feedback" maximized></q-dialog>
  </q-page>
</template>

<script>
import { encode, decode } from 'js-base64'
import bcrypt from 'bcryptjs'
import { database } from 'boot/config'
export default {
  data: () => ({
    dialog: {
      about: false,
      feedback: false,
      changePassword: false,
      editProfile: false
    },

    password: {}
  }),

  methods: {
    changePassword () {
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      const authorize = bcrypt.compareSync(this.password.old, user.hash)
      if (authorize) {
        if (this.password.new === this.password.confirm) {
          const salt = bcrypt.genSaltSync(13)
          user.hash = bcrypt.hashSync(this.password.new, salt)

          const notif = this.$q.notify({
            type: 'ongoing',
            message: 'Changing password. Please wait...'
          })

          database.put(user).then(response => {
            user._rev = response.rev
            this.$q.localStorage.set('sessionid', encode(JSON.stringify(user)))
            notif({
              type: 'positive',
              message: 'Password changed successfully !',
              timeout: 3000
            })
            this.dialog.changePassword = !this.dialog.changePassword
          }).catch(error => {
            this.$q.notify({
              type: 'info',
              message: 'Unable to change password. Please check your network connection and try again !'
            })
            return error
          })
        } else {
          this.$q.notify({
            type: 'info',
            message: 'Passwords do not match !'
          })
        }
      } else {
        this.$q.notify({
          type: 'info',
          message: 'Old password did not match !'
        })
      }
    }
  }
}
</script>
