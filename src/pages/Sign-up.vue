<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 450px">
      <q-card-section>
        <div class="text-center">It's totally Free !</div>
        <div class="text-center text-subtitle1 text-bold">Create your account</div>
        <q-form @submit.prevent="signUser">
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
            />
          </div>
          <div>
            <label for="email" class="text-subtitle1">Email Address</label>
            <q-input
              v-model.trim="user.email"
              id="email"
              type="email"
              name="email"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in email']"
            />
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
            />
          </div>
          <div>
            <label for="gender" class="text-subtitle1">Gender</label>
            <q-select
              v-model.trim="user.gender"
              :options="['Male', 'Female']"
              id="gender"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in gender']"
            />
          </div>
          <div>
            <label for="dob" class="text-subtitle1">Date of Birth</label>
            <q-input v-model="user.dob" id="dob" outlined dense mask="date" :rules="['date']">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="user.dob">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div>
            <label for="password" class="text-subtitle1">Password</label>
            <q-input
              v-model="password"
              id="password"
              type="password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in password']"
            />
          </div>
          <q-btn
            type="submit"
            label="Register"
            class="full-width"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <div class="column">
          <div class="col">
            <div class="text-subtitle2 text-grey">Have an Account with us ?</div>
          </div>
          <div class="col text-center">
            <q-btn
              flat
              no-caps
              label="Login here"
              :to="{ name: 'Sign-in' }"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import bcrypt from 'bcryptjs'
import { database } from 'boot/config'
import { encode } from 'js-base64'
export default {
  data: () => ({
    user: {
      meta: {
        stores: '_user',
        enabled: true,
        date: new Date().toISOString()
      }
    },
    password: ''
  }),

  methods: {
    signUser () {
      this.user._id = 'user:' + this.user.email
      const salt = bcrypt.genSaltSync(13)
      this.user.hash = bcrypt.hashSync(this.password, salt)

      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Creating your account...'
      })
      database.put(this.user).then(response => {
        notif({
          type: 'positive',
          message: 'Account created successfully !',
          timeout: 3000
        })
        this.user._rev = response.rev
        this.$q.localStorage.set('sessionid', encode(JSON.stringify(this.user)))
        this.$router.push({ name: 'App Dashboard' })
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to create account. Please check your network and try again !'
        })
        return error
      })
    }
  }
}
</script>
