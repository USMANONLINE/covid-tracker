<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 450px">
      <q-card-section>
        <div class="text-center">Welcome back !</div>
        <div class="text-center text-subtitle1 text-bold">Login to your account</div>
        <q-form @submit.prevent="login">
          <div>
            <label for="email" class="text-subtitle1">Email Address</label>
            <q-input
              v-model="user.email"
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
            <label for="password" class="text-subtitle1">Password</label>
            <q-input
              v-model.trim="user.password"
              id="password"
              type="password"
              name="password"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in password']"
            />
          </div>
          <div class="row">
            <div class="col">
              <q-checkbox
                v-model="user.rememberMe"
                label="Remember Me"
              />
            </div>
            <div class="col">
              <q-btn
                flat
                dense
                no-caps
                class="q-mt-xs float-right"
                label="Forgot Password"
                :to="{ name: 'Forgot-Password' }"
              />
            </div>
          </div>
          <q-btn
            type="submit"
            label="Login"
            class="full-width"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <div class="column">
          <div class="col">
            <div class="text-subtitle2 text-grey">Don't have an account ?</div>
          </div>
          <div class="col text-center">
            <q-btn
              flat
              no-caps
              label="Register here"
              :to="{ name: 'Sign-up' }"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import bcrypt from 'bcryptjs'
import {database} from "boot/config";
import {encode} from "js-base64";
export default {
  data: () => ({
    user: {
      rememberMe: false
    }
  }),

  methods: {
    login () {
      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Signing in. Please wait...'
      })
      database.get('user:' + this.user.email).then(response => {
        const authorized = bcrypt.compareSync(this.user.password, response.hash)
        if (authorized) {
          this.$q.localStorage.set('sessionid', encode(JSON.stringify(response)))
          if (response.meta.enabled) {
            if (response.meta.stores === '_user') {
              this.$router.push({ name: 'App Dashboard' })
            } else {
              this.$router.push({ name: '' })
            }
          } else {
            notif({
              type: 'warning',
              message: 'Your account has been disabled !',
              timeout: 3000
            })
          }
        } else {
          notif({
            type: 'warning',
            message: 'Incorrect login credentials !',
            timeout: 3000
          })
        }
      }).catch(error => {
        notif({
          type: 'negative',
          message: 'No account found with email ' + this.user.email,
          timeout: 3000
        })
        return error
      })
    }
  }
}
</script>
