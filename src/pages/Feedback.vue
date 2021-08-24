<template>
  <q-page padding>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="mails" label="Issues" />
        <q-tab name="alarms" label="Suggestions" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <q-card class="q-mb-xs" v-for="(issue, issueId) in issues" :key="issueId">
            <q-card-section>
              <div class="text-h6">
                <q-badge rounded>{{ issue.title }}</q-badge>
              </div>
              <div class="text-subtitle2">{{ String(issue.meta.reportBy).substring(5) }}</div>
              <div class="text-subtitle2">{{ new Date(issue.meta.date).toDateString() }}</div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pt-none">
              {{ issue.description }}
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <q-card class="q-mb-xs" v-for="(issue, issueId) in suggestions" :key="issueId">
            <q-card-section>
              <div class="text-h6">
                <q-badge rounded>{{ issue.title }}</q-badge>
              </div>
              <div class="text-subtitle2">{{ String(issue.meta.reportBy).substring(5) }}</div>
              <div class="text-subtitle2">{{ new Date(issue.meta.date).toDateString() }}</div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pt-none">
              {{ issue.description }}
            </q-card-section>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  preFetch ({ store }) {
    store.dispatch('queryRecords', {
      selector: {
        $or: [
          { 'meta.stores': '_issues' },
          { 'meta.stores': '_suggestions' }
        ]
      },
      limit: 1000
    })
  },

  computed: {
    issues () {
      return this.$store.state.records.docs.filter(doc => doc.meta.stores === '_issues')
    },
    suggestions () {
      return this.$store.state.records.docs.filter(doc => doc.meta.stores === '_suggestions')
    }
  },

  data: () => ({
    tab: 'mails'
  })
}
</script>
