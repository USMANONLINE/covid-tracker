<template>
  <q-page padding>
    <q-tabs
      v-if="$route.name === 'App Cases'"
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

    <q-separator v-if="$route.name === 'App Cases'" />

    <q-tab-panels v-if="$route.name === 'App Cases'" v-model="tab" animated>
      <q-tab-panel name="mails">
        <q-banner v-if="myReports.length === 0" inline-actions class="text-white bg-primary shadow-2">
          You have no reports
          <template v-slot:action>
            <q-btn no-caps @click="dialog.newCase = !dialog.newCase" outline color="white" label="Report case" />
          </template>
        </q-banner>
        <q-card class="q-mb-xs q-mt-sm rounded-borders" v-for="(covidReport, covidReportId) in myReports" :key="covidReportId">
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
                  <q-avatar text-color="primary">
                    <q-icon name="home"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.state }}</q-item-label>
                  <q-item-label caption lines="1">State</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar  text-color="primary">
                    <q-icon name="home"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.lga }}</q-item-label>
                  <q-item-label caption lines="1">LGA</q-item-label>
                </q-item-section>
              </q-item>

<!--              <q-item clickable v-ripple>-->
<!--                <q-item-section avatar>-->
<!--                  <q-avatar  text-color="primary">-->
<!--                    <q-icon name="location_on"/>-->
<!--                  </q-avatar>-->
<!--                </q-item-section>-->

<!--                <q-item-section>-->
<!--                  <q-item-label>{{ covidReport.possible_disease !== '' ? String(covidReport.possible_disease).toUpperCase() : covidReport.address }}</q-item-label>-->
<!--                  <q-item-label caption lines="2">{{ covidReport.possible_disease !== '' ? 'Possible Disease' : 'Address' }}</q-item-label>-->
<!--                </q-item-section>-->
<!--              </q-item>-->
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-actions align="around">
            <q-btn  color="grey"  flat icon="add"   outline @click="feedback.caseid = covidReport._id, dialog.patientReport = !dialog.patientReport" />
            <q-btn v-if="$route.name === 'Admin Cases'"  color="grey"  flat icon="info" @click="$store.commit('initRecord', covidReport), dialog.caseDetail = !dialog.caseDetail" outline />
            <q-btn   color="grey" flat icon="description" @click="loadCaseReport(covidReport._id)"/>
            <q-btn  flat color="negative" icon="delete" @click="$store.commit('initRecord', covidReport), dialog.deleteCase = !dialog.deleteCase"/>
          </q-card-actions>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <q-banner v-if="publicReports.length === 0" inline-actions class="text-white bg-primary shadow-2">
          No public reports yet
          <template v-slot:action>
            <q-btn no-caps  @click="dialog.newCase = !dialog.newCase" outline  color="white" label="Report case" />
          </template>
        </q-banner>
        <q-card class="q-mb-xs" v-for="(covidReport, covidReportId) in publicReports" :key="covidReportId">
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
                  <q-avatar text-color="primary">
                    <q-icon name="home"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.state }}</q-item-label>
                  <q-item-label caption lines="1">State</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar  text-color="primary">
                    <q-icon name="home"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ covidReport.lga }}</q-item-label>
                  <q-item-label caption lines="1">LGA</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-actions align="around">
            <q-btn  color="grey"  flat icon="add"   outline @click="feedback.caseid = covidReport._id, dialog.patientReport = !dialog.patientReport" />
            <q-btn v-if="$route.name === 'Admin Cases'"  color="grey"  flat icon="info" @click="$store.commit('initRecord', covidReport), dialog.caseDetail = !dialog.caseDetail" outline />
            <q-btn   color="grey" flat icon="description" @click="loadCaseReport(covidReport._id)"/>
            <q-btn  flat color="negative" icon="delete" @click="$store.commit('initRecord', covidReport), dialog.deleteCase = !dialog.deleteCase"/>
          </q-card-actions>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <template v-if="$route.name === 'Admin Cases'">
      <q-card class="q-mb-xs" v-for="(covidReport, covidReportId) in $store.state.records.docs" :key="covidReportId">
        <q-card-section horizontal>
          <div>
            <img
              :src="getUrl(covidReport)"
              style="height: 170px;"
              class="rounded-borders q-pa-xs"
            />
          </div>
          <q-list style="width: 100%" separator bordered>
            <q-item >
              <q-item-section avatar>
                <q-avatar  text-color="primary">
                  <q-icon name="person"/>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ covidReport.name }}</q-item-label>
                <q-item-label caption lines="1">Full Name</q-item-label>
              </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-avatar  text-color="primary">
                  <q-icon name="sentiment_dissatisfied"/>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ covidReport.condition }}</q-item-label>
                <q-item-label caption lines="1">Condition</q-item-label>
              </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-avatar  text-color="primary">
                  <q-icon name="sentiment_dissatisfied"/>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ covidReport.possible_disease !== '' ? String(covidReport.possible_disease).toUpperCase() : covidReport.address }}</q-item-label>
                <q-item-label caption lines="2">{{ covidReport.possible_disease !== '' ? 'Possible Disease' : 'Address' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-grey">
          <q-btn fab-mini flat stack icon="add"   @click="feedback.caseid = covidReport._id, dialog.patientReport = !dialog.patientReport" >
            <q-tooltip>Add report</q-tooltip>
          </q-btn>
          <q-btn flat fab-mini icon="info"   @click="$store.commit('initRecord', covidReport), dialog.caseDetail = !dialog.caseDetail" outline >
            <q-tooltip>Detailed report</q-tooltip>
          </q-btn>
          <q-btn flat fab-mini icon="description"   @click="loadCaseReport(covidReport._id)">
            <q-tooltip>View reports</q-tooltip>
          </q-btn>
          <q-btn  flat fab-mini icon="delete"   color="negative" @click="$store.commit('initRecord', covidReport), dialog.deleteCase = !dialog.deleteCase">
            <q-tooltip>Delete report</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </template>

    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.newCase" maximized>
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
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model.trim="report.phone"
              label="Patients Phone"
              type="number"
              name="p-phone"
              lazy-rules
              outlined
              dense
              hint="Patient or Relative phone number"
              :rules="[ val => val && val.length > 0 || 'Please type in phone']"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
            <q-select
              v-model="report.gender"
              label="Patients Gender"
              lazy-rules
              outlined
              dense
              :options="['Male', 'Female']"
              :rules="[ val => val && val.length > 0 || 'Please select gender']"
            >
              <template v-slot:prepend>
                <q-icon name="wc" />
              </template>
            </q-select>
            <q-select
              v-model="report.relationship"
              label="Relationship with patient"
              lazy-rules
              outlined
              dense
              :options="['Father', 'Mother', 'Child', 'Brother', 'Sister', 'Uncle', 'Nephew', 'Niece', 'Wife', 'Husband', 'Neighbor', 'None']"
              :rules="[ val => val && val.length > 0 || 'Please select relationship status']"
            >
              <template v-slot:prepend>
                <q-icon name="wc" />
              </template>
            </q-select>
            <q-select
              v-model="report.condition"
              label="Disease Level"
              lazy-rules
              dense
              outlined
              :options="['Early signs', 'Feverish', 'Critical']"
              :rules="[ val => val && val.length > 0 || 'Please select condition']"
            >
<!--            <q-select-->
<!--              v-model="report.likely_disease"-->
<!--              @filter="loadDiseases"-->
<!--              :options="diseases"-->
<!--              dense-->
<!--              outlined-->
<!--              lazy-rules-->
<!--              label="Likely Disease"-->
<!--              :rules="[ val => val && val.length > 0 || 'Please select likely disease']"-->
<!--            />-->
            >
              <template v-slot:prepend>
                <q-icon name="sentiment_dissatisfied" />
              </template>
            </q-select>
            <q-select
              multiple
              v-model="report.symptoms"
              :options="symptoms"
              dense
              outlined
              use-chips
              lazy-rules
              label="Symptoms"
              :rules="[ val => val && val.length > 3 || 'Please select symptoms']"
              hint="Please select atleast 4 options"
            >
              <template v-slot:prepend>
                <q-icon name="bug_report" />
              </template>
            </q-select>
            <q-select
              multiple
              v-model="report.other_symptom"
              :options="other_symptoms"
              dense
              outlined
              lazy-rules
              label="Other Symptoms"
              :rules="[ val => val && val.length > 0 || 'Please select others symptoms']"
              input-debounce="0"
              use-input
              use-chips
              new-value-mode="add-unique"
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
            >
              <template v-slot:prepend>
                <q-icon name="map" />
              </template>
            </q-select>
            <q-select
              v-if="report.state !== undefined"
              :options="states[report.state]"
              v-model="report.lga"
              label="Lga"
              dense
              outlined
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please select lga']"
            >
              <template v-slot:prepend>
                <q-icon name="location_on" />
              </template>
            </q-select>
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

    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.caseDetail" maximized>
      <q-card>
        <q-toolbar>
          <q-btn @click="dialog.caseDetail = !dialog.caseDetail" flat round dense icon="west"/>
          <q-toolbar-title>Report Detail</q-toolbar-title>
        </q-toolbar>
        <q-separator/>
        <q-list separator bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
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
              <q-avatar  text-color="primary">
                <q-icon name="phone"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.phone }}</q-item-label>
              <q-item-label caption lines="2">Phone Number</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="wc"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.gender }}</q-item-label>
              <q-item-label caption lines="2">Gender</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="wc"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.relationship }}</q-item-label>
              <q-item-label caption lines="2">Relationship with patient</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="sentiment_dissatisfied"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $store.state.record.condition }}</q-item-label>
              <q-item-label caption lines="2">Condition</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-if="$store.state.record.possible_disease !== ''">
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="bug_report"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ String($store.state.record.possible_disease).toUpperCase() }}</q-item-label>
              <q-item-label caption lines="2">Possible Disease</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="sentiment_dissatisfied"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-chip v-for="(syms, sysmId) in $store.state.record.symptoms" :key="sysmId">{{ syms }}</q-chip>
              </q-item-label>
              <q-item-label caption lines="2">Symptoms</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="sentiment_dissatisfied"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-chip v-for="(osyms, osysmId) in $store.state.record.other_symptom" :key="osysmId">{{ osyms }}</q-chip>
              </q-item-label>
              <q-item-label caption lines="2">Other Symptom</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="map"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.state }}</q-item-label>
              <q-item-label caption lines="2">State</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="home"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.lga }}</q-item-label>
              <q-item-label caption lines="2">LGA</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="description"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $store.state.record.info }}</q-item-label>
              <q-item-label caption lines="2">Information</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  text-color="primary">
                <q-icon name="location_on"/>
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

    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.patientReport" maximized>
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
              color="primary"
              no-caps
              class="full-width"
              type="submit"
              label="Save"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.deleteCase">
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

    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog.caseReports" maximized>
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
                  <q-btn primary label="Delete" outline size="sm" icon="delete" color="negative" @click="deletePatientReport(pr)"/>
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
import {decode, encode} from "js-base64";
import states from '../../states'

export default {
  preFetch ({ store, currentRoute }) {
    store.dispatch('queryRecords', {
      selector: {
        'meta.stores': '_casereport'
      },
      limit: 1000
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
    symptoms: [
      'Sore Throat', 'Dry Cough', 'Difficulty in Breathing / Shortness of Breath', 'Chest Pain / Pressure', 'Loss of Taste / Smell',
      'Muscle Pain', 'Chest Pain', 'Abdominal Pain', 'Facial Swelling', 'Bleeding From the Mouth or Nose',
      'A Persistent Cough that last more than 3 weeks', 'Weight loss', 'Night Sweats', 'High Temperature', 'Swellings in the Neck'
    ],
    other_symptoms: ['Tiredness', 'Fever', 'General Weakness', 'Malaise', 'Respiratory Distress', 'Headache', 'Diarrhoea', 'Conjunctivitis', 'Loss of Appetite']
  }),

  computed: {
    myReports () {
      let userid = this.$route.query.account
      let reports = []
      const filteredReports = this.$store.state.records.docs.filter(doc => String(doc.meta.sentBy) === userid)
      if (filteredReports.length > 0) {
        reports = filteredReports
      }
      return reports
    },
    publicReports () {
      let userid = this.$route.query.account
      let reports = []
      const filteredReports = this.$store.state.records.docs.filter(doc => String(doc.meta.sentBy) !== userid)
      if (filteredReports.length > 0) {
        reports = filteredReports
      }
      return reports
    }
  },

  methods: {
    getDiseaseCounts (symptoms) {
      let diseaseCounts = { 'Flu': 0, 'Sars': 0, tuberclusis: 0 }
      const diseaseMapping = {
        'Flu': ['Sore Throat', 'Dry Cough', 'Difficulty in Breathing / Shortness of Breath', 'Chest Pain / Pressure', 'Loss of Taste / Smell'],
        'Sars': ['Muscle Pain', 'Chest Pain', 'Abdominal Pain', 'Facial Swelling', 'Bleeding From the Mouth or Nose'],
        tuberclusis: ['A Persistent Cough that last more than 3 weeks', 'Weight loss', 'Night Sweats', 'High Temperature', 'Swellings in the Neck']
      }
      symptoms.forEach(symptom => {
        const covid = diseaseMapping['Flu'].find(disease => disease === symptom)
        const lassa = diseaseMapping['Sars'].find(disease => disease === symptom)
        const tuberclusis = diseaseMapping.tuberclusis.find(disease => disease === symptom)
        if (covid !== undefined) {
          diseaseCounts['Flu'] += 1
        } else if (lassa !== undefined) {
          diseaseCounts['Sars'] += 1
        } else if (tuberclusis !== undefined) {
          diseaseCounts.tuberclusis += 1
        }
      })
      return diseaseCounts
    },

    getDisease (metric) {
      let count = 0
      let patientDisease = ''
      Object.keys(metric).forEach(disease => {
        if (metric[disease] > 0) {
          count = metric[disease]
          if (count >= 3) {
            patientDisease = disease
          }
        }
      })
      return patientDisease
    },

    sendReport () {
      const metric = this.getDiseaseCounts(this.report.symptoms)
      const patientDisease = this.getDisease(metric)
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      this.report.meta.sentBy = this.$route.query.account
      this.report.possible_disease = patientDisease
      user.reports += 1

      database.bulkDocs([this.report, user]).then(response => {
        const reportRef = response.find(rep => rep.id === this.report._id)
        const userRef = response.find(use => use.id === user._id)
        this.report._rev = reportRef.rev
        user._rev = userRef.rev
        this.$store.commit('addToRecords', this.report)
        this.$q.localStorage.set('sessionid', encode(JSON.stringify(user)))
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
      const user = JSON.parse(decode(this.$q.localStorage.getItem('sessionid')))
      if (user.meta.stores === '_user') {
        user.reports -= 1
        const report = Object.assign({}, this.$store.state.record)
        report._deleted = true
        database.bulkDocs([user, report]).then(response => {
          const reportRef = response.find(rep => rep.id === report._id)
          const userRef = response.find(use => use.id === user._id)
          user._rev = userRef.rev
          this.$q.localStorage.set('sessionid', encode(JSON.stringify(user)))
          this.$store.commit('removeFromRecords', reportRef.id)
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
      } else {
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
      }
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
