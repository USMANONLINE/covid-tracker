<template>
  <q-page padding>
    <q-table
      :columns="columns"
      :data="$store.state.records.docs"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="fullname" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
          <q-td key="gender" :props="props">{{ props.row.gender }}</q-td>
          <q-td key="dob" :props="props">{{ props.row.dob }}</q-td>
          <q-td key="status" :props="props">
            <q-chip :class="props.row.meta.enabled ? 'bg-positive text-white' : 'bg-negative text-white'">{{ props.row.meta.enabled ? 'Active' : 'Disabled' }}</q-chip>
          </q-td>
          <q-td key="reports" :props="props">0</q-td>
          <q-td key="date" :props="props">{{ new Date(props.row.meta.date).toLocaleString() }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn flat round dense icon="sync" size="sm" @click="dialog.deactivate = !dialog.deactivate, $store.commit('initRecord', Object.assign({}, props.row))" />
            <q-btn flat round dense icon="delete" size="sm" @click="dialog.deleteAccount = !dialog.deleteAccount, $store.commit('initRecord', Object.assign({}, props.row))" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog.deactivate">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>{{ $store.state.record.meta.enabled ? 'Deactivate' : 'Activate' }} Account</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-card-section>
          {{ $store.state.record.meta.enabled ? 'Are you sure you want to deactivate account ? This will prevent the user from logging into the system' : 'Are you sure you want to activate account ? This will allow the user to login' }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Yes" outline @click="deactivateAccount" />
          <q-btn label="No" outline v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.deleteAccount">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>Delete Account</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-card-section>
          Are you sure you want to delete account ? This action cannot be undone
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Yes" outline @click="deleteAccount" />
          <q-btn label="No" outline v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { database } from 'boot/config'
export default {
  preFetch ({ store }) {
    store.commit('initRecord', { meta: { enabled: false } })
    const query = {
      selector: {
        'meta.stores': '_user'
      },
      limit: 1000
    }
    store.dispatch('queryRecords', query)
  },

  data: () => ({
    filter: '',
    columns: [
      { name: 'fullname', field: 'fullname', label: 'Full Name' },
      { name: 'email', field: 'email', label: 'Email Address' },
      { name: 'phone', field: 'phone', label: 'Phone Number' },
      { name: 'gender', field: 'gender', label: 'Gender' },
      { name: 'dob', field: 'dob', label: 'Date of Birth' },
      { name: 'status', field: 'status', label: 'Account Status' },
      { name: 'reports', field: 'reports', label: 'Reports' },
      { name: 'date', field: 'date', label: 'Date Created' },
      { name: 'actions', field: 'actions', label: 'Actions' },
    ],

    dialog: {
      deactivate: false,
      deleteAccount: false
    }
  }),

  methods: {
    deleteAccount () {
      database.remove(this.$store.state.record).then(response => {
        this.$store.commit('removeFromRecords', response.id)
        this.$q.notify({
          type: 'positive',
          message: 'Account deleted successfully'
        })
        this.dialog.deleteAccount = !this.dialog.deleteAccount
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to delete account. Please check your network connection and try again !'
        })
        return error
      })
    },
    deactivateAccount () {
      this.$store.state.record.meta.enabled = !this.$store.state.record.meta.enabled
      database.put(this.$store.state.record).then(response => {
        const update = this.$store.state.record
        update._rev = response.rev
        this.$store.commit('updateRecordsRow', update)
        const msg = update.meta.enabled ? 'activated' : 'deactivated'
        this.$q.notify({
          type: 'positive',
          message: 'Account ' + msg + ' successfully'
        })
        this.dialog.deactivate = !this.dialog.deactivate
      }).catch(error => {
        const status = this.$store.state.record.meta.enabled ? 'activate' : 'deactivate'
        this.$q.notify({
          type: 'negative',
          message: 'Unable to ' + action + ' account'
        })
        return error
      })
    }
  }
}
</script>
