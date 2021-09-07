<template>
  <q-page padding>
    <q-dialog v-model="dialog.newAccount" position="top">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>New Admin</q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close"/>
        </q-toolbar>
        <q-separator/>
        <q-card-section>
          <q-form @submit.prevent="signAdmin">
            <div>
              <label for="full-name" class="text-subtitle1">Full Name</label>
              <q-input
                autofocus
                v-model.trim="user.name"
                id="full-name"
                type="text"
                name="name"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in fullname']"
              />
            </div>
            <div>
              <label for="email" class="text-subtitle1">Email Address</label>
              <q-input
                v-model.trim="user.email"
                id="email"
                type="email"
                name="email"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in email']"
              />
            </div>
            <div>
              <label for="phone" class="text-subtitle1">Phone Number</label>
              <q-input
                v-model.trim="user.phone"
                id="phone"
                type="number"
                name="phone"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in phone number']"
              />
            </div>
            <div>
              <label for="gender" class="text-subtitle1">Gender</label>
              <q-select
                v-model.trim="user.gender"
                :options="['Male', 'Female']"
                id="gender"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in gender']"
              />
            </div>
            <div>
              <label for="password" class="text-subtitle1">Password</label>
              <q-input
                v-model="password"
                id="password"
                type="password"
                name="password"
                outlined
                dense
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in password']"
              />
            </div>
            <q-btn
              label="Register"
              type="submit"
            />
          </q-form>
        </q-card-section>
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

    <q-table
      :filter="filter"
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
          <q-td key="date" :props="props">{{ new Date(props.row.meta.date).toLocaleString() }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn flat round dense icon="delete" size="sm" @click="dialog.deleteAccount = !dialog.deleteAccount, $store.commit('initRecord', Object.assign({}, props.row))" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="dialog.newAccount = !dialog.newAccount" fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import bcrypt from "bcryptjs";
import {database} from "boot/config";
import {encode} from "js-base64";

export default {
  preFetch ({ store }) {
    store.dispatch('queryRecords', {
      selector: {
        'meta.stores': '_admin'
      },
      limit: 1000
    })
  },

  data: () => ({
    dialog: {
      newAccount: false,
      deleteAccount: false
    },

    user: {
      meta: {
        stores: '_admin',
        date: new Date().toISOString(),
        enabled: true
      }
    },
    password: '',

    filter: '',
    columns: [
      { name: 'fullname', field: 'fullname', label: 'Full Name' },
      { name: 'email', field: 'email', label: 'Email Address' },
      { name: 'phone', field: 'phone', label: 'Phone Number' },
      { name: 'gender', field: 'gender', label: 'Gender' },
      { name: 'date', field: 'date', label: 'Date Created' },
      { name: 'actions', field: 'actions', label: 'Actions' },
    ],
  }),

  methods: {
    signAdmin () {
      this.user._id = 'user:' + this.user.email
      const salt = bcrypt.genSaltSync(13)
      this.user.hash = bcrypt.hashSync(this.password, salt)

      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Creating your account...'
      })
      database.put(this.user).then(response => {
        notif({
          type: 'positive',
          message: 'Account created successfully !',
          timeout: 3000
        })
        this.user._rev = response.rev
        this.$store.commit('addToRecords', this.user)
        this.user = {
          meta: {
            stores: '_admin',
            date: new Date().toISOString(),
            enabled: true
          }
        }
        this.dialog.newAccount = !this.dialog.newAccount
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to create account. Please check your network and try again !'
        })
        return error
      })
    },

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
    }
  }
}
</script>
