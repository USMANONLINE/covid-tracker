<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 450px">
      <q-card-section>
        <div class="text-center">Welcome back !</div>
        <div class="text-center text-subtitle1 text-bold">Login to your account</div>
        <q-form>
          <div>
            <label for="email" class="text-subtitle1">Email Address</label>
            <q-input
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
                label="Remember Me"
              />
            </div>
            <div class="col">
              <q-btn
                flat
                dense
                no-caps
                class="q-mt-xs"
                label="Forgot Password"
                :to="{ name: 'Forgot-Password' }"
              />
            </div>
          </div>
          <q-btn
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
export default {
  // name: 'PageName',
}
</script>
