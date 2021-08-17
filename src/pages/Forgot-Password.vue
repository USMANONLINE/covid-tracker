<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 450px">
      <q-card-section class="text-center">
        <q-avatar size="100px" font-size="52px" color="negative" text-color="white" icon="report_gmailerrorred" />
      </q-card-section>
      <q-card-section>
        <div class="text-center text-h6 text-bold">Lost your Password?</div>
        <div class="text-center text-subtitle1 text-grey">Type your registered email address below, we will send you a recovery link</div>
        <q-form class="q-mt-xl">
          <div>
            <label for="email" class="text-subtitle1">Email Address</label>
            <q-input
              placeholder="Type your email address"
              id="email"
              type="email"
              name="email"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in email']"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>
          <q-btn
            icon="send"
            color="primary"
            label="Send link"
            class="full-width q-pa-xs"
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
