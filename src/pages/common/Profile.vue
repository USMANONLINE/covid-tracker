<template>
  <q-page padding class="q-pa-md">
    <q-card flat class="text-center q-mb-xs">
      <q-img
        class="rounded-borders"
        style="width: 150px; height: 150px"
        :src="getProfileUrl()"
      />
      <q-card-section class="bg-primary text-white rounded-borders q-card">
        <div class="text-h6 text-weight-bold">{{ user.name }}</div>
        <div class="text-subtitle2">{{ user.email }}</div>
        <div class="text-subtitle2">{{user.phone }}</div>
      </q-card-section>
    </q-card>
    <q-list separator >
      <q-item clickable v-ripple @click="dialog.editProfile = !dialog.editProfile">
        <q-item-section avatar>
          <q-avatar  icon="account_circle" text-color="grey-8">
          </q-avatar>
        </q-item-section>
        <q-item-section>Edit Profile</q-item-section>
        <q-item-section avatar>
          <q-icon color="grey-8" name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="dialog.changePassword = !dialog.changePassword">
        <q-item-section avatar>
          <q-avatar  icon="lock" text-color="grey-8">
          </q-avatar>
        </q-item-section>
        <q-item-section>Change Password</q-item-section>
        <q-item-section avatar>
          <q-icon color="grey-8" name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="report.title = 'Feedback', dialog.feedback = !dialog.feedback">
        <q-item-section avatar>
          <q-avatar  icon="textsms" text-color="grey-8">
          </q-avatar>
        </q-item-section>
        <q-item-section>Feedback</q-item-section>
        <q-item-section avatar>
          <q-icon color="grey-8" name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="report.title = 'Technical Support', dialog.feedback = !dialog.feedback">
        <q-item-section avatar>
          <q-avatar  icon="mail" text-color="grey-8">
          </q-avatar>
        </q-item-section>
        <q-item-section>Technical Support</q-item-section>
        <q-item-section avatar>
          <q-icon color="grey-8" name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="dialog.about = !dialog.about">
        <q-item-section avatar>
          <q-avatar  icon="info" text-color="grey-8">
          </q-avatar>
        </q-item-section>
        <q-item-section>About the Developer</q-item-section>
        <q-item-section avatar>
          <q-icon color="grey-8" name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      color="primary"
      no-caps
      type="submit"
      label="Logout"
      icon="power_settings_new"
      class="full-width q-pa-xs q-mt-lg"
    />
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.about" maximized>
      <q-card>
        <q-toolbar>
          <q-btn round flat dense icon="west" @click="dialog.about = !dialog.about"/>
          <q-toolbar-title>About the Developer</q-toolbar-title>
        </q-toolbar>
        <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">Abdullahi Umar Farouq</div>
            <div class="text-subtitle2">Bsc. Information Technology, YUMSUK-Nigeria</div>
          </div>
        </q-img>
        <q-separator />
        <q-card-section>
<!--          <h5>Abdullahi Umar Farouq</h5>-->
<!--          <p>Bsc. Information Technology, YUMSUK-Nigeria</p>-->
          <q-list  separator >
            <q-card  bordered flat class="bg-grey-1 rounded-borders ">
              <q-item class="text-primary">
                <q-item-section top avatar>
                  <q-avatar  text-color="primary" icon="phone" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>+2348165734509</q-item-label>
                  <q-item-label caption class="text-primary">Mobile</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-card bordered flat  class="bg-grey-1 rounded-borders q-mt-md ">
            <q-item class="text-primary">
              <q-item-section top avatar>
                <q-avatar  text-color="primary" icon="email" />
              </q-item-section>

              <q-item-section>
                <q-item-label>ffabdullahi@gmail.com</q-item-label>
                <q-item-label caption class="text-primary">Email Address</q-item-label>
              </q-item-section>
            </q-item>
            </q-card>
            <q-card  bordered flat class="bg-grey-1 rounded-borders q-mt-md ">
            <q-item class="text-primary">
              <q-item-section top avatar>
                <q-avatar  text-color="primary" icon="phone" />
              </q-item-section>

              <q-item-section>
                <q-item-label>+2348165734509</q-item-label>
                <q-item-label caption class="text-primary">WhatsApp Messenger</q-item-label>
              </q-item-section>
            </q-item>
            </q-card>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.changePassword" maximized>
      <q-card>
        <q-toolbar elevated>
          <q-btn round flat dense icon="west" @click="dialog.changePassword = !dialog.changePassword"/>
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
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="lock_open" />
              </template>
            </q-input>
            <q-input
              v-model.trim="password.new"
              type="password"
              label="New Password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in new password']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="lock" />
              </template>
            </q-input>
            <q-input
              v-model.trim="password.confirm"
              type="password"
              label="Confirm Password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in confirm password']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="lock" />
              </template>
            </q-input>
            <q-btn
              color="primary"
              no-caps
              class="full-width"
              type="submit"
              label="Change Password"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.editProfile" maximized>
      <q-card>
        <q-toolbar>
          <q-btn flat round dense icon="west" @click="dialog.editProfile = !dialog.editProfile"/>
          <q-toolbar-title>Edit Profile</q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-card-section>
          <q-form @submit.prevent="updateProfile">
            <div>
              <label for="full-name" class="text-subtitle1">Full Name</label>
              <q-input
                v-model.trim="user.name"
                id="full-name"
                type="text"
                name="name"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in fullname']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="account_circle" />
                </template>
              </q-input>
            </div>
            <div>
              <label for="phone" class="text-subtitle1">Phone Number</label>
              <q-input
                v-model.trim="user.phone"
                id="phone"
                type="tel"
                name="phone"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in phone number']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="phone" />
                </template>
              </q-input>
            </div>
            <div>
              <label for="profile" class="text-subtitle1">Profile Pic</label>
              <q-file accept=".jpg, image/*" capture @input="uploadProfilePic" lazy-rules dense id="profile" outlined v-model="user.profile">
                <template v-slot:prepend>
                  <q-icon color="primary" name="attach_file" />
                </template>
              </q-file>
            </div>
            <q-btn
              no-caps
              color="primary"
              class="q-mt-lg q-pa-xs full-width"
              type="submit"
              label="Update Profile"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.feedback" maximized>
      <q-card>
        <q-toolbar>
          <q-btn round flat dense icon="west" @click="dialog.feedback = !dialog.feedback"/>
          <q-toolbar-title>{{ report.title }}</q-toolbar-title>
        </q-toolbar>
        <q-separator/>
        <q-card-section>
          <q-form @submit.prevent="saveReport">
            <q-input
              v-model.trim="report.description"
              outlined
              lazy-rules
              type="textarea"
              label="Describe what you've encountered"
              :rules="[ val => val && val.length > 0 || 'Please type in what you\'ve have encountered']"
            />
            <div class="q-gutter-sm">
              <q-radio v-model="report.status" val="issues" label="Issues" />
              <q-radio v-model="report.status" val="suggestions" label="Suggestions" />
            </div>
            <q-btn
              class="full-width q-mt-lg"
              no-caps
              color="primary"
              label="Send"
              type="submit"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { encode, decode } from 'js-base64'
import bcrypt from 'bcryptjs'
import { database, url } from 'boot/config'
export default {
  data: () => ({
    url,
    dialog: {
      about: false,
      feedback: false,
      changePassword: false,
      editProfile: false
    },

    password: {},

    report: {
      title: '',
      meta: { date: new Date().toISOString() }
    },

    user: {},

    profile: {}
  }),

  methods: {
    getProfileUrl () {
      if (this.user.profilepic !== undefined) {
        return this.url + this.user.profilepic.doc + '/' + this.user.profilepic.filename
      } else {
        return '/avatar.png'
      }
    },
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
    },

    saveReport () {
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      this.report.meta.reportBy = user._id
      if (this.report.status === 'issues') {
        this.report._id = 'issues:' + new Date().toISOString()
        this.report.meta.stores = '_issues'
      } else {
        this.report._id = 'suggestions:' + new Date().toISOString()
        this.report.meta.stores = '_suggestions'
      }

      if (this.report.status !== undefined) {
        database.put(this.report).then(response => {
          this.$q.notify({
            type: 'positive',
            message: this.report.title + ' sent successfully !'
          })
          this.dialog.feedback = !this.dialog.feedback
          this.report = { title: '', meta: { date: new Date().toISOString() } }
        }).catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Unable to send ' + this.report.title + '. Please check your network and try again !'
          })
          return error
        })
      } else {
        this.$q.notify({
          type: 'info',
          message: 'Please select ' + this.report.title + ' status'
        })
      }
    },

    updateProfile () {
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      user.name = this.user.name
      user.phone = this.user.phone
      database.put(user).then(response => {
        user._rev = response.rev
        this.$q.localStorage.set('sessionid', encode(JSON.stringify(user)))
        this.$q.notify({
          type: 'positive',
          message: 'Profile updated successfully'
        })
        this.dialog.editProfile = !this.dialog.editProfile
      }).catch(error => {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Unable to update profile. Please check your network and try again !'
        })
        return error
      })
    },

    uploadProfilePic (file) {
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      const profile = {
        _id: 'profilepic:' + new Date().toISOString(),
        _attachments: {
          [file.name]: {
            content_type: file.type,
            data: file
          }
        }
      }
      user.profilepic = { doc: profile._id, filename: file.name }
      database.bulkDocs([user, profile]).then(response => {
        const userRev = response.find(doc => doc.id === user._id)
        user._rev = userRev.rev
        this.$q.localStorage.set('sessionid', encode(JSON.stringify(user)))
        this.$q.notify({
          type: 'positive',
          message: 'Profile picture updated successfully'
        })
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to update profile pic. Please check your network and try again !'
        })
        return error
      })
    }
  },

  mounted() {
    this.user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
  }
}
</script>
