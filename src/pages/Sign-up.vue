<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 450px">
      <q-card-section>
        <div class="text-center">It's totally Free !</div>
        <div class="text-center text-subtitle1 text-bold">Create your account</div>
        <q-form>
          <div>
            <label for="full-name" class="text-subtitle1">Full Name</label>
            <q-input
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
              id="phone"
              type="tel"
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
              :options="['Male', 'Female']"
              id="gender"
              outlined
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type in gender']"
            />
          </div>
          <div>
            <label for="dob" class="text-subtitle1">Date of Birth</label>
            <q-input id="dob" outlined dense mask="date" :rules="['date']">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div>
            <label for="password" class="text-subtitle1">Password</label>
            <q-input
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
            class="full-width"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <div class="column">
          <div class="col">
            <div class="text-subtitle2 text-grey">Have an Account with us ?</div>
          </div>
          <div class="col text-center">
            <q-btn
              flat
              no-caps
              label="Login here"
              :to="{ name: 'Sign-in' }"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
