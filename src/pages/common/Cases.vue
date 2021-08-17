<template>
  <q-page>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="mails" label="My Reports" />
      <q-tab name="alarms" label="Public Reports" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
        <q-card v-for="(covidReport, covidReportId) in $store.state.records.docs" :key="covidReportId">
          <q-card-section horizontal>
            <div>
              <img
                :src="getUrl(covidReport)"
                style="height: 170px;"
                class="rounded-borders q-pa-xs"
              />
            </div>
            <q-list style="width: 100%" separator bordered>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <q-icon name="person"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.name }}</q-item-label>
                  <q-item-label caption lines="1">Full Name</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <q-icon name="person"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.address }}</q-item-label>
                  <q-item-label caption lines="2">Address</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <q-icon name="person"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.name }}</q-item-label>
                  <q-item-label caption lines="1">Full Name</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn label="Add Report" outline @click="feedback.caseid = covidReport._id, dialog.patientReport = !dialog.patientReport" />
            <q-btn label="View Detail" @click="$store.commit('initRecord', covidReport), dialog.caseDetail = !dialog.caseDetail" outline />
            <q-btn label="View Reports" outline @click="loadCaseReport(covidReport._id)"/>
            <q-btn label="Delete" outline color="negative" @click="$store.commit('initRecord', covidReport), dialog.deleteCase = !dialog.deleteCase"/>
          </q-card-actions>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="alarms">
       <q-list padding>
           <q-item bordered class="shadow-2 rounded-borders">
             <q-item-section top thumbnail class="q-ml-none">
               <img src="https://cdn.quasar.dev/img/mountains.jpg">
             </q-item-section>

             <q-item-section>
               <q-item-label><span><q-icon name="home" /></span>Plot 3 Mandawari Sabon Titi Kuluwa Shopping Mall.</q-item-label>
               <q-item-label caption>
               <span class="float-left" >
                 <div>
                 <q-btn  dense flat label="COVID-19" icon="bug_report" />
                 </div>
               </span>
                 <span class="float-right" >
                     <div>
                <q-btn no-caps  dense flat label="Status" icon="error" />
                 </div>
               </span>
               </q-item-label>
             </q-item-section>

             <q-item-section side>
               <q-icon name="chevron_right" color="grey" />
             </q-item-section>
           </q-item>
           <q-item bordered class="shadow-2 rounded-borders">
             <q-item-section top thumbnail class="q-ml-none">
               <img src="https://cdn.quasar.dev/img/mountains.jpg">
             </q-item-section>

             <q-item-section>
               <q-item-label><span><q-icon name="home" /></span>Plot 3 Mandawari Sabon Titi Kuluwa Shopping Mall.</q-item-label>
               <q-item-label caption>
               <span class="float-left" >
                 <div>
                 <q-btn  dense flat label="COVID-19" icon="bug_report" />
                 </div>
               </span>
                 <span class="float-right" >
                     <div>
                <q-btn no-caps  dense flat label="Status" icon="error" />
                 </div>
               </span>
               </q-item-label>
             </q-item-section>

             <q-item-section side>
               <q-icon name="chevron_right" color="grey" />
             </q-item-section>
           </q-item>
       </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="dialog.newCase" maximized>
      <q-card >
        <q-toolbar>
          <q-btn @click="dialog.newCase = !dialog.newCase" flat round dense icon="west"/>
          <q-toolbar-title>New Case</q-toolbar-title>
        </q-toolbar>
        <q-separator/>
        <q-card-section class="q-pa-md">
          <q-form @submit.prevent="sendReport" class="q-pa-md">
            <q-input
              v-model.trim="report.name"
              label="Patients Name"
              type="text"
              name="p-name"
              lazy-rules
              outlined
              dense
              :rules="[ val => val && val.length > 0 || 'Please type in name']"
            />
            <q-input
              v-model.trim="report.phone"
              label="Patients Phone"
              type="tel"
              name="p-phone"
              lazy-rules
              outlined
              dense
              hint="Patient or Relative phone number"
              :rules="[ val => val && val.length > 0 || 'Please type in phone']"
            />
            <q-select
              v-model="report.gender"
              label="Patients Gender"
              lazy-rules
              outlined
              dense
              :options="['Male', 'Female']"
              :rules="[ val => val && val.length > 0 || 'Please select gender']"
            />
            <q-select
              v-model="report.relationship"
              label="Relationship with patient"
              lazy-rules
              outlined
              dense
              :options="['Father', 'Mother', 'Child', 'Brother', 'Sister', 'Uncle', 'Nephew', 'Niece', 'Wife', 'Husband', 'Neighbor', 'None']"
              :rules="[ val => val && val.length > 0 || 'Please select relationship status']"
            />
            <q-select
              v-model="report.condition"
              label="Disease Level"
              lazy-rules
              dense
              outlined
              :options="['Early signs', 'Feverish', 'Critical']"
              :rules="[ val => val && val.length > 0 || 'Please select condition']"
            >
              <template v-slot:prepend>
                <q-icon name="sort" />
              </template>
            </q-select>
            <q-select
              v-model="report.likely_disease"
              @filter="loadDiseases"
              :options="diseases"
              dense
              outlined
              lazy-rules
              label="Likely Disease"
              :rules="[ val => val && val.length > 0 || 'Please select likely disease']"
            >
              <template v-slot:prepend>
                <q-icon name="bug_report" />
              </template>
            </q-select>
            <q-select
              v-model="report.symptom"
              @filter="loadSymptoms"
              :options="symptoms"
              dense
              outlined
              lazy-rules
              label="Symptoms"
              :rules="[ val => val && val.length > 0 || 'Please select symptoms']"
            >
              <template v-slot:prepend>
                <q-icon name="sentiment_dissatisfied" />
              </template>
            </q-select>
            <q-file
              @input="uploadPatientPic"
              v-model="report.picture"
              dense
              outlined
              lazy-rules
              label="Take Picture"
              accept=".jpg, image/*"
              capture
              class="q-mb-sm"
            >
              <template v-slot:prepend>
                <q-icon name="add_a_photo" />
              </template>
            </q-file>
            <q-select
              :options="Object.keys(states)"
              v-model="report.state"
              label="State"
              dense
              outlined
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please select state']"
            />
            <q-select
              v-if="report.state !== undefined"
              :options="states[report.state]"
              v-model="report.lga"
              label="Lga"
              dense
              outlined
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please select lga']"
            />
            <q-input
              v-model="report.info"
              type="textarea"
              outlined
              label="More about patients current condition"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in info']"
            />
            <q-input
              v-model="report.address"
              type="textarea"
              outlined
              label="Patients House Address"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in address']"
            >
              <template v-slot:prepend>
                <q-icon name="home" />
              </template>
            </q-input>
            <q-btn
              no-caps
              color="primary"
              class="full-width q-pa-sm"
              label="Send"
              type="submit"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.caseDetail" maximized>
      <q-card>
        <q-toolbar>
          <q-btn @click="dialog.caseDetail = !dialog.caseDetail" flat round dense icon="west"/>
          <q-toolbar-title>Report Detail</q-toolbar-title>
        </q-toolbar>
        <q-separator/>
        <q-list separator bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.name }}</q-item-label>
              <q-item-label caption lines="2">Full Name</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.phone }}</q-item-label>
              <q-item-label caption lines="2">Phone Number</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.gender }}</q-item-label>
              <q-item-label caption lines="2">Gender</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.relationship }}</q-item-label>
              <q-item-label caption lines="2">Relationship with patient</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.condition }}</q-item-label>
              <q-item-label caption lines="2">Condition</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.likely_disease }}</q-item-label>
              <q-item-label caption lines="2">Likely Disease</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.symptom }}</q-item-label>
              <q-item-label caption lines="2">Symptom</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.state }}</q-item-label>
              <q-item-label caption lines="2">State</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.lga }}</q-item-label>
              <q-item-label caption lines="2">LGA</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.info }}</q-item-label>
              <q-item-label caption lines="2">Information</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <q-icon name="person"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.address }}</q-item-label>
              <q-item-label caption lines="2">Address</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.patientReport" maximized>
      <q-card>
        <q-toolbar>
          <q-btn @click="dialog.patientReport = !dialog.patientReport" flat round dense icon="west"/>
          <q-toolbar-title>Report Patient Status</q-toolbar-title>
        </q-toolbar>
        <q-separator/>
        <q-card-section>
          <q-form @submit.prevent="savePatientStatus">
            <q-input
              v-model="feedback.description"
              type="textarea"
              placeholder="Describe patients current condition"
              outlined
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in patients current condition']"
            />
            <q-btn
              type="submit"
              label="Save"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.deleteCase">
      <q-card style="width: 450px">
        <q-toolbar>
          <q-toolbar-title>Delete Case</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-separator />
        <q-card-section class="text-subtitle1">
          Are you sure you want to delete case ? This action cannot be undone
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Yes" outline color="negative" @click="deleteCase" />
          <q-btn label="No" outline v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.caseReports" maximized>
      <q-card>
        <q-toolbar>
          <q-btn @click="dialog.caseReports = !dialog.caseReports" flat round dense icon="west"/>
          <q-toolbar-title>Patients Report</q-toolbar-title>
        </q-toolbar>
        <q-separator/>
        <q-card-section>
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="(pr, prId) in reports"
              :key="prId"
              :subtitle="new Date(pr.meta.date).toLocaleDateString()"
            >
              <div>
                {{ pr.description }}
                <div>
                  <q-btn label="Delete" outline size="sm" icon="delete" color="negative" @click="deletePatientReport(pr)"/>
                </div>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="dialog.newCase = !dialog.newCase" fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {database, url} from "boot/config";
import {decode} from "js-base64";
import states from '../../states'

export default {
  preFetch ({ store }) {
    store.dispatch('queryRecords', {
      selector: {
        'meta.stores': '_casereport'
      }
    })
  },

  data: () => ({
    url,
    tab: 'mails',
    states,

    feedback: {
      _id: 'patientreport:' + new Date().toISOString(),
      meta: {
        stores: '_patientreport',
        date: new Date().toISOString()
      }
    },

    dialog: {
      newCase: false,
      caseDetail: false,
      patientReport: false,
      deleteCase: false,
      caseReports: false
    },

    report: {
      _id: 'report:' + new Date().toISOString(),
      meta: {
        stores: '_casereport',
        date: new Date().toISOString()
      }
    },
    reports: [],
    diseases: [],
    symptoms: []
  }),

  methods: {
    sendReport () {
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      this.report.meta.sentBy = user._id
      database.put(this.report).then(response => {
        this.report._rev = response.rev
        this.$store.commit('addToRecords', response)
        this.$q.notify({
          type: 'positive',
          message: 'Report sent successfully !'
        })
        this.report = {
          _id: 'report:' + new Date().toISOString(),
          meta: {
            stores: '_casereport',
            date: new Date().toISOString()
          }
        }
        this.dialog.newCase = !this.dialog.newCase
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to send report. Please check your network and try again !'
        })
        return error
      })
    },

    loadDiseases (val, update, abort) {
      database.find({
        selector: {
          'meta.stores': '_likely_disease'
        }
      }).then(response => {
        update(() => {
          this.diseases = response.docs.map(entry => entry.option)
        })
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to load diseases'
        })
        return error
      })
    },

    loadSymptoms (val, update, abort) {
      database.find({
        selector: {
          'meta.stores': '_symptom'
        }
      }).then(response => {
        update(() => {
          this.symptoms = response.docs.map(entry => entry.option)
        })
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to load diseases'
        })
        return error
      })
    },

    uploadPatientPic (file) {
      const upload = {
        _id: 'patient_picture:' + new Date().toISOString(),
        _attachments: {
          [file.name]: {
            content_type: file.type,
            data: file
          }
        }
      }
      database.put(upload).then(response => {
        this.$q.notify({
          type: 'positive',
          message: 'Patient picture uploaded successfully'
        })
        this.report.upload = { doc: upload._id, filename: file.name }
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to upload patient pic. Please check your network and try again !'
        })
        return error
      })
    },

    getUrl (record) {
      if (record.upload !== undefined) {
        return this.url + record.upload['doc'] + '/' + record.upload['filename']
      } else {
        return '/avatar.png'
      }
    },

    savePatientStatus () {
      database.put(this.feedback).then(response => {
        this.$q.notify({
          type: 'positive',
          message: 'Report saved successfully'
        })
        this.feedback = {
          _id: 'patientreport:' + new Date().toISOString(),
          meta: {
            stores: '_patientreport',
            date: new Date().toISOString()
          }
        }
        this.dialog.patientReport = !this.dialog.patientReport
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to save patient status. Please try again !'
        })
        return error
      })
    },

    deleteCase () {
      database.remove(this.$store.state.record).then(response => {
        this.$store.commit('removeFromRecords', response.id)
        this.$q.notify({
          type: 'positive',
          message: 'Case deleted successfully'
        })
        this.dialog.deleteCase = !this.dialog.deleteCase
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to delete case. Please check your network and try again !'
        })
        return error
      })
    },

    loadCaseReport (id) {
      database.find({
        selector: {
          caseid: id,
          'meta.stores': '_patientreport'
        }
      }).then(response => {
        if (response.docs.length === 0) {
          this.$q.notify({
            type: 'info',
            message: 'No reports recorded'
          })
        } else {
          this.reports = response.docs
          this.dialog.caseReports = !this.dialog.caseReports
        }
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to load case report. Please check your network and try again !'
        })
        return error
      })
    },

    deletePatientReport (doc) {
      database.remove(doc).then(response => {
        const index = this.reports.findIndex(doc => doc._id === response.id)
        this.reports.splice(index, 1)
        this.$q.notify({
          type: 'positive',
          message: 'Patient report deleted successfully'
        })
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: 'Unable to delete patient report. Please check your network and try again !'
        })
        return error
      })
    }
  }
}
</script>
