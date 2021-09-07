<template>
  <q-page padding>
    <div class="text-h5 q-mt-md text-bold text-center">Report a Case</div>
    <div class="text-center text-subtitle1">Easily save a life by reporting them for best protection and cure</div>
    <div class="q-mt-xl fixed-bottom q-ma-sm">
      <q-btn
        color="primary"
        no-caps
        unelevated
        label="Report a Case"
        class="full-width q-mb-md"
        :to="{ name: 'Sign-up' }"
      />
      <div class="row q-gutter-xs">
        <div class="col">
          <q-btn
            outlined
            no-caps
            label="Sign Up"
            class="full-width"
            :to="{ name: 'Sign-up' }"
          />
        </div>
        <div class="col">
          <q-btn
            outlined
            no-caps
            label="Sign In"
            class="full-width"
            :to="{ name: 'Sign-in' }"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
