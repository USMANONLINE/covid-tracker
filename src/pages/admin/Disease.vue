<template>
  <q-page padding>
    <q-input
      dense
      outlined
      lazy-rules
      type="search"
      v-model.trim="search"
      placeholder="Search..."
    />

    <div class="row">
      <div class="q-pa-xs col-xs-12 col-sm-12 col-md-6">
        <q-card>
          <q-toolbar class="text-center">
            <q-toolbar-title>Likely Diseases</q-toolbar-title>
          </q-toolbar>
          <q-separator />
          <q-list separator>
            <q-item v-for="(ld, ldId) in entries.filter(e => e.meta.stores === '_likely_disease')" :key="ldId">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ ldId + 1 }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ ld.option }}</q-item-label>
                <q-item-label caption lines="1">{{ new Date(ld.meta.date).toLocaleDateString() }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn icon="more_vert" flat round dense>
                  <q-menu>
                    <q-list separator style="min-width: 100px">
                      <q-item @click="entry = Object.assign({}, ld), dialog.updateOption = !dialog.updateOption" clickable v-close-popup>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item @click="dialog.deleteEntry = !dialog.deleteEntry, $store.commit('initRecord', ld)" clickable v-close-popup>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="q-pa-xs col-xs-12 col-sm-12 col-md-6">
        <q-card>
          <q-toolbar class="text-center">
            <q-toolbar-title>Symptoms</q-toolbar-title>
          </q-toolbar>
          <q-separator />
          <q-list separator>
            <q-item clickable v-ripple v-for="(ld, ldId) in entries.filter(e => e.meta.stores === '_symptom')" :key="ldId">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ ldId + 1 }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ ld.option }}</q-item-label>
                <q-item-label caption lines="1">{{ new Date(ld.meta.date).toLocaleDateString() }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn icon="more_vert" flat round dense>
                  <q-menu>
                    <q-list separator style="min-width: 100px">
                      <q-item @click="entry = Object.assign({}, ld), dialog.updateOption = !dialog.updateOption" clickable v-close-popup>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item @click="dialog.deleteEntry = !dialog.deleteEntry, $store.commit('initRecord', ld)" clickable v-close-popup>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialog.entry">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>Entry</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-card-section>
          <q-form @submit.prevent="createOption">
            <q-input
              v-model="entry.option"
              autofocus
              type="text"
              label="Option"
              outlined
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in an option']"
            />
            <div class="q-gutter-sm">
              <q-radio v-model="entry.type" val="symptom" label="Symptom" />
              <q-radio v-model="entry.type" val="likely_disease" label="Likely Disease" />
            </div>
            <q-btn
              type="submit"
              label="Save"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.updateOption">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>Update Option</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-card-section>
          <q-form @submit.prevent="updateOption">
            <q-input
              v-model="entry.option"
              autofocus
              type="text"
              label="Option"
              outlined
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in an option']"
            />
            <q-btn
              type="submit"
              label="Update"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.deleteEntry">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>Delete Option</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-card-section class="text-subtitle1">
          Are you sure you want to delete selected option ? This action cannot be undone
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Yes" outline color="negative" @click="deleteOption" />
          <q-btn label="No" outline v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="dialog.entry = !dialog.entry" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {database} from "boot/config";

export default {
  preFetch ({ store }) {
    store.dispatch('queryRecords', {
      selector: {
        $or: [
          { 'meta.stores': '_symptom' },
          { 'meta.stores': '_likely_disease' },
        ]
      },
      limit: 1000
    })
  },

  computed: {
    entries () {
      return this.$store.state.records.docs.filter(entry => String(entry.option).match(this.search))
    }
  },

  data: () => ({
    search: '',
    dialog: {
      entry: false,
      updateOption: false,
      deleteEntry: false
    },
    entry: {
      type: 'symptom',
      meta: {
        date: new Date().toISOString()
      }
    }
  }),

  methods: {
    createOption () {
      if (this.entry.type === 'symptom') {
        this.entry._id = 'symptom:' + new Date().toISOString()
        this.entry.meta.stores = '_symptom'
      } else {
        this.entry._id = 'likely_disease:' + new Date().toISOString()
        this.entry.meta.stores = '_likely_disease'
      }
      database.put(this.entry).then(response => {
        this.entry._rev = response.rev
        this.$store.commit('addToRecords', this.entry)
        this.$q.notify({
          type: 'positive',
          message: 'Entry saved successfully'
        })
        this.entry = {
          type: 'symptom',
          meta: {
            date: new Date().toISOString()
          }
        }
        this.dialog.entry = !this.dialog.entry
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to create option. Please check your network and try again !'
        })
        return error
      })
    },

    updateOption () {
      database.put(this.entry).then(response => {
        this.entry._rev = response.rev
        this.$store.commit('updateRecordsRow', this.entry)
        this.entry = {
          type: 'symptom',
          meta: {
            date: new Date().toISOString()
          }
        }
        this.$q.notify({
          type: 'positive',
          message: 'Option updated successfully'
        })
        this.dialog.updateOption = !this.dialog.updateOption
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to update option. Please check your network and try again !'
        })
        return error
      })
    },

    deleteOption () {
      database.remove(this.$store.state.record).then(response => {
        this.$store.commit('removeFromRecords', response.id)
        this.$q.notify({
          type: 'positive',
          message: 'Option deleted successfully'
        })
        this.dialog.deleteEntry = !this.dialog.deleteEntry
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to delete option. Please check your network and try again !'
        })
        return error
      })
    }
  }
}
</script>
