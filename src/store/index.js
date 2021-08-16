import Vue from 'vue'
import Vuex from 'vuex'
import {database} from "boot/config";
import {Notify} from "quasar";

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      record: {},
      records: { docs: [] }
    },

    mutations: {
      initRecord (state, record) { state.record = record },
      initRecords (state, records) { state.records = records },
      addToRecords (state, record) { state.records.docs.push(record) },
      removeFromRecords (state, id) {
        const index = state.records.docs.findIndex(doc => doc._id === id)
        state.records.docs.splice(index, 1)
        state.records.docs = state.records.docs.slice()
      },
      updateRecordsRow (state, record) {
        const index = state.records.docs.findIndex(doc => doc._id === record._id)
        state.records.docs[index] = record
        state.records.docs = state.records.docs.slice()
      }
    },

    actions: {
      queryRecords (context, params) {
        database.find(params).then(response => {
          context.commit('initRecords', response)
        }).catch(error => {
          Notify.create({
            type: 'neagtive',
            message: 'Unable to retrieve records. Please check your network and try again !'
          })
        })
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
