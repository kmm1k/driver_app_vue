<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pa-3">
        <form>
          <v-select
            label="Algus"
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
            required
          ></v-select>
          <v-text-field
            label="lõpp-punkt"
            v-model="name"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            required
          ></v-text-field>
          <!--v-text-field
            label="E-mail"
            v-model="email"
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            required
          ></v-text-field-->
          <v-flex xs11 sm5>
            <v-dialog
              persistent
              v-model="modal"
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                label="Kuupäev"
                v-model="date"
                prepend-icon="event"
                :error-messages="dateErrors"
                @input="$v.date.$touch()"
                @blur="$v.date.$touch()"
                required
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-checkbox
            label="Kas nõustud tingimustega?"
            v-model="checkbox"
            :error-messages="checkboxErrors"
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
            required
          ></v-checkbox>

          <v-btn
            :loading="loading3"
            :disabled="loading3"
            class="white--text"
            @click="add()" block large color="success">
            <v-icon color="white">near_me</v-icon>
          </v-btn>
        </form>
      </v-card>
    </v-flex>

  </v-layout>
</template>


<script>
  import {validationMixin} from 'vuelidate'
  import {required, maxLength, email} from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
      name: {required, maxLength: maxLength(10)},
      select: {required},
      date: {required},
      checkbox: {required}
    },
    data () {
      return {
        name: '',
        email: '',
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        checkbox: false,
        loader: null,
        loading3: false,
        loading: false,
        date: null,
        menu: false,
        modal: false
      }
    },
    methods: {
      add () {
        this.$v.$touch()
        if (this.$v.$error == false) {
          this.loader = 'loading3'
          this.loading = true
        }


      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
      goBack() {
        this.$router.go(-1)
      }
    },
    watch: {
      // call again the method if the route changes
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.required && errors.push('Sa pead nõustuma, et lisada')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Algus on nõutud')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Lõpp-punkt on nõutud.')
        return errors
      },
      dateErrors () {
        const errors = []
        if (!this.$v.date.$dirty) return errors
        !this.$v.date.required && errors.push('Kuupäev on nõutud.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail on nõutud')
        return errors
      }
    }
  }
</script>
