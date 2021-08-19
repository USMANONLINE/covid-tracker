<template>
  <q-page class="flex" padding>
    <q-card flat style="width: 450px">
      <q-toolbar separator class="shadow-1">
        <q-btn round flat dense icon="west" :to="{ name: 'Home' }" />
        <q-toolbar-title>Forgot password</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <q-card-section class="text-center">
        <q-avatar size="100px" font-size="100px"  text-color="dark" icon="report_gmailerrorred" />
      </q-card-section>
      <q-card-section>
        <div class="text-center text-h6 text-bold">Lost your Password?</div>
        <div class="text-center text-subtitle1 text-grey">Type your registered email address below, we will send you a recovery link</div>
        <q-form class="q-mt-xl">
          <div>
            <label for="email" class="text-subtitle1 text-grey">Email Address</label>
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
                <q-icon color="dark" name="mail" />
              </template>
            </q-input>
          </div>
          <q-btn
            no-caps
            icon="send"
            color="primary"
            label="Send link"
            class="full-width q-pa-xs"
          />
        </q-form>
      </q-card-section>
    </q-card>
    <div style="margin-top:-100px">
      hi
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
