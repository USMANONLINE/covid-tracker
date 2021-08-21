<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card>
          <div class="text-center">
            <q-knob
              :value="diseaseMetric.covid"
              show-value
              font-size="12px"
              size="70px"
              :thickness="0.22"
              color="negative"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ diseaseMetric.covid }}%
            </q-knob>
            <div class="q-pb-sm">Covid 19</div>
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card>
          <div class="text-center">
            <q-knob
              :value="diseaseMetric.lassa"
              show-value
              font-size="12px"
              size="70px"
              :thickness="0.22"
              color="warning"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ diseaseMetric.lassa }}%
            </q-knob>
            <div class="q-pb-sm">Lassa Fever</div>
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card>
          <div class="text-center">
            <q-knob
              :value="diseaseMetric.tuberclusis"
              show-value
              font-size="12px"
              size="70px"
              :thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ diseaseMetric.tuberclusis }}%
            </q-knob>
            <div class="q-pb-sm">Tuberclusis</div>
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card>
          <div class="text-center">
            <q-knob
              :value="diseaseMetric.none"
              show-value
              font-size="12px"
              size="70px"
              :thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ diseaseMetric.none }}%
            </q-knob>
            <div class="q-pb-sm">Not Identified</div>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <column-chart :data="reportByLga" title="Report By LGA"></column-chart>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <column-chart :data="reportByState" title="Report By STATES"></column-chart>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <line-chart :data="reportByDate" title="Reports by Date"></line-chart>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
        <q-card>
          <q-card-section>
            <pie-chart :data="reportByPossibleDisease" title="Possible Disease"></pie-chart>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  preFetch ({ store }) {
    store.dispatch('queryRecords', {
      selector: {
        'meta.stores': '_casereport'
      }
    })
  },

  computed: {
    reportByDate () {
      let results = {}
      if (this.$store.state.records.docs.length > 0) {
        const formattedRecords = this.$store.state.records.docs.map(report => {
          const record = report
          record.dateCreated = new Date(report.meta.date).toLocaleDateString()
          return record
        })
        const dates = formattedRecords.map(doc => doc.dateCreated)
        dates.forEach(date => {
          const totalMatch = formattedRecords.filter(docs => docs.dateCreated === date)
          results[date] = totalMatch.length
        })
      }
      return results
    },

    reportByPossibleDisease () {
      const results = []
      if (this.$store.state.records.docs.length > 0) {
        const diseases = [...new Set(this.$store.state.records.docs.map(doc => doc.possible_disease))]
        diseases.forEach(disease => {
          const matchFound = this.$store.state.records.docs.filter(d => d.possible_disease === disease)
          results.push([String(disease).toUpperCase(), matchFound.length])
        })
        const notIdentified = this.$store.state.records.docs.filter(d => d.possible_disease === '')
        if (notIdentified.length > 0) {
          results.push(['Not Identified', notIdentified.length])
        }
      }
      return results
    },

    reportByLga () {
      const results = []
      if (this.$store.state.records.docs.length > 0) {
        const lgas = [...new Set(this.$store.state.records.docs.map(doc => doc.lga))]
        lgas.forEach(l => {
          const matchFound = this.$store.state.records.docs.filter(record => record.lga === l)
          results.push([l, matchFound.length])
        })
      }
      return results
    },

    reportByState () {
      const results = []
      if (this.$store.state.records.docs.length > 0) {
        const states = [...new Set(this.$store.state.records.docs.map(doc => doc.state))]
        states.forEach(l => {
          const matchFound = this.$store.state.records.docs.filter(record => record.state === l)
          results.push([l, matchFound.length])
        })
      }
      return results
    },

    diseaseMetric () {
      let result = { covid: 0, tuberclusis: 0, lassa: 0, none: 0 }
      if (this.$store.state.records.docs.length > 0) {
        const diseases = ['covid', 'lassa', 'tuberclusis']
        diseases.forEach(disease => {
          const matchFound = this.$store.state.records.docs.filter(d => d.possible_disease === disease)
          if (disease === 'covid') {
            result.covid = matchFound.length
          } else if (disease === 'lassa') {
            result.lassa = matchFound.length
          } else {
            result.tuberclusis = matchFound.length
          }
        })
        const notIdentified = this.$store.state.records.docs.filter(d => d.possible_disease === '')
        if (notIdentified.length > 0) {
          result.none = notIdentified.length
        }
      }
      return result
    }
  }
}
</script>
