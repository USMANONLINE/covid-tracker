import PouchDB from 'pouchdb'
import find from 'pouchdb-find'

PouchDB.plugin(find)

const database = new PouchDB('http://localhost:5984/covid', { skip_setup: true })

export { database }
