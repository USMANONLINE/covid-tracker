<template>
  <q-page padding>
    <p>{{ reports }}</p>
    <p>{{ diseases }}</p>
    <p>{{ symptoms }}</p>
  </q-page>
</template>

<script>
import { database } from 'boot/config'
export default {
  preFetch ({ store, currentRoute }) {
    let records = {}
    database.find({
      selector: {
        'meta.stores': '_casereport',
        'meta.sentBy': currentRoute.query.account,
      },
      limit: 1000
    }).then(response => {
      store.commit('initRecords', response)
      records = response
      return database.find({
        selector: {
          $or: [
            { 'meta.stores': '_likely_disease' },
            { 'meta.stores': '_symptom'}
          ]
        }
      })
    }).then(res => {
      records.docs = records.docs.concat(res.docs)
      store.commit('initRecords', records)
    }).catch(error => {
      return error
    })
  },

  computed: {
    reports () {
      return this.$store.state.records.docs.filter(doc => String(doc.meta.stores) === '_casereport')
    },

    diseases () {
      return this.$store.state.records.docs.filter(doc => String(doc.meta.stores) === '_likely_disease')
    },

    symptoms () {
      return this.$store.state.records.docs.filter(doc => String(doc.meta.stores) === '_symptom')
    }
  }
}
</script>
