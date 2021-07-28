<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 450px">
      <q-card-section>
        <div class="text-center text-h6 text-bold">Lost your Password?</div>
        <div class="text-center text-subtitle1">Type your registered email address below, we will send you a recovery link</div>
        <q-form class="q-mt-xl">
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
          <q-btn
            label="Send link"
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
export default {
  // name: 'PageName',
}
</script>
