import PouchDB from 'pouchdb'
import find from 'pouchdb-find'

import Vue from 'vue'
import Chart from 'chart.js'
import ChartKick from 'vue-chartkick'

PouchDB.plugin(find)
Vue.use(ChartKick.use(Chart))

let url = null
let database = null

url = 'http://localhost:5984/covid/'
database = new PouchDB('http://localhost:5984/covid', { skip_setup: true })

// if (process.env.DEV) {
//   url = 'http://localhost:5984/covid/'
//   database = new PouchDB('http://localhost:5984/covid', { skip_setup: true })
// } else {
//   url = 'https://f42b3b75-48ce-462c-b241-5cf6767080b1-bluemix.cloudantnosqldb.appdomain.cloud/covid/'
//   database = new PouchDB('https://f42b3b75-48ce-462c-b241-5cf6767080b1-bluemix.cloudantnosqldb.appdomain.cloud/covid', { skip_setup: true })
// }

export { database, url }
