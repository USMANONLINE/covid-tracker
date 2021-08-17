<template>
  <q-page padding>
    <q-banner v-if="$store.state.records.docs.length === 0" inline-actions class="text-white text-center bg-info">
      No New Notifications Available !
    </q-banner>

    <q-list separator v-if="$store.state.records.docs.length > 0" bordered class="rounded-borders">
      <q-item-label header>Notifications ({{ $store.state.records.docs.length }})</q-item-label>

      <template v-for="(report, reportIndex) in $store.state.records.docs">
        <q-item :key="reportIndex">
          <q-item-section avatar top>
            <q-img :src="getUrl(report)" size="34px" />
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">{{ report.name }}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">Address</span>
              <span class="text-grey-8"> - {{ report.address }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ new Date(report.meta.date).toLocaleDateString() }}
            </q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <span>{{ report.condition }}</span>
            </q-item-label>
          </q-item-section>

<!--          <q-item-section top side>-->
<!--            <div class="text-grey-8 q-gutter-xs">-->
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />-->
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
<!--              <q-btn size="12px" flat dense round icon="more_vert" />-->
<!--            </div>-->
<!--          </q-item-section>-->
        </q-item>
      </template>
    </q-list>
  </q-page>
</template>

<script>
import { url } from 'boot/config'
export default {
  preFetch ({ store }) {
    store.dispatch('queryRecords', {
      selector: {
        'meta.stores': '_casereport'
      }
    })
  },

  data: () => ({
    url
  }),

  methods: {
    getUrl (record) {
      if (record.upload !== undefined) {
        return this.url + record.upload['doc'] + '/' + record.upload['filename']
      } else {
        return '/avatar.png'
      }
    }
  }
}
</script>
