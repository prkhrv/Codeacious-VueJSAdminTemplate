<template>
  <b-row>
      <b-col md="12">
        <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Inventory </strong> <small> Click to update/delete</small>
            </div>

            <b-list-group v-for="inventory of inventorys" :key="inventory._id">
              <b-list-group-item :href="`inventories/${inventory._id}`"  class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{inventory.product_id}}</h5>
                  <small>{{inventory.expiry_date}}</small>
                </div>
                <p class="mb-1">
                  {{inventory.Batch_No}}
                </p>
                <small>{{inventory.UPC_code}}</small>
              </b-list-group-item>
            </b-list-group>
          </b-card>

          <router-link :to="{ name: 'Create Inventory' }">
            <b-button type="submit" value="Add Product" variant="outline-dark"> Add Inventory </b-button>
          </router-link>



        <!-- <b-card>
          <div slot="header">
            <strong>Create</strong> Product
          </div>
          <b-form action="product">
          <b-form-group
            description="The products full name."
            label="Product Name"
            label-for="basicName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicName" v-model="input.product_name" type="text" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            description="The price of the product"
            label="Price"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="input.price" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="A short description of the product"
            label="Short Description"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="input.short_description" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Detailed Description"
            label-for="basicTextarea"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="input.long_description" id="basicTextarea" :textarea="true" :rows="9" placeholder="Detailed Description of the Product"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Keywords"
            label-for="basicMultiSelect"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="basicMultiSelect"
              v-model="input.keywords"
              :plain="true"
              :multiple="true"
              :options="[
                {
                  text: 'Please select some item',
                  value: null
                },
                {
                  text: 'This is First option',
                  value: 'a'
                }, {
                  text: 'Default Selected Option',
                  value: 'b'
                }, {
                  text: 'This is another option',
                  value: 'c'
                }, {
                  text: 'This one is disabled',
                  value: 'd',
                  disabled: true
                }]"
              :value="[null,'c']">
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="Search Keywords"
            label-for="basicMultiSelect"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="basicMultiSelect"
              v-model="input.search_keywords"
              :plain="true"
              :multiple="true"
              :options="[
                {
                  text: 'Please select some item',
                  value: null
                },
                {
                  text: 'This is First option',
                  value: 'a'
                }, {
                  text: 'Default Selected Option',
                  value: 'b'
                }, {
                  text: 'This is another option',
                  value: 'c'
                }, {
                  text: 'This one is disabled',
                  value: 'd',
                  disabled: true
                }]"
              :value="[null,'c']">
            </b-form-select>
          </b-form-group> -->

          <!-- <div slot="footer">
              <b-button v-on:click="sendData()" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
          </div> -->
          </b-form>
        </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import { Callout } from '@coreui/vue'
  import axios from 'axios'
  import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
  import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
  import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
  import CardBarChartExample from './dashboard/CardBarChartExample'
  import MainChartExample from './dashboard/MainChartExample'
  import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
  import CalloutChartExample from './dashboard/CalloutChartExample'
  var link = window.location.href
  var key = link.split("8080",24).pop()
export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data: function () {
    return {
      selected: 'Month',
      inventorys: [],
      errors: [],
      input: {
                    product_name: "",
                    subtitle: "",
                    short_description: "",
                    long_description: "",
                    price: "",
                    keywords: [],
                    search_keywords:[]
                },
                key: "",
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'fa fa-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'fa fa-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'fa fa-cc-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'fa fa-paypal' },
          activity: 'Last month'
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'fa fa-google-wallet' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'fa fa-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: {
        avatar: {
          label: '<i class="icon-people"></i>',
          class: 'text-center'
        },
        user: {
          label: 'User'
        },
        country: {
          label: 'Country',
          class: 'text-center'
        },
        usage: {
          label: 'Usage'
        },
        payment: {
          label: 'Payment method',
          class: 'text-center'
        },
        activity: {
          label: 'Activity'
        }
      }
    }
  },
  async mounted() {
    axios.get("https://selacious-cloud-siteapi.herokuapp.com/inventories")
    .then(response => {this.inventorys = response.data})
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    },
    async sendData() {
                axios({ method: "POST", "url": "https://selacious-cloud-siteapi.herokuapp.com/inventories/", "data": this.input, "headers": { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
                }, error => {
                    console.error(error);
                });
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
