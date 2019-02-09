<template>
  <b-row>
      <b-col md="12">
        <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Site</strong>
            </div>
              <b-list-group-item href="#"  class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{posts.siteid}}</h5>
                  <small>{{posts.Owner}}</small>
                </div>
                <p class="mb-1">
                  {{posts.url}}
                </p>
              </b-list-group-item>
            </b-list-group>
          </b-card>


        <b-card>
          <div slot="header">
            <strong>Update/Delete</strong> Site
          </div>
          <b-form v-on:submit.prevent="updateData">
            <b-form-group
              description="The Site full URL."
              label="Site URL"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicName" v-model="posts.url" type="text" autocomplete="name" placeholder="Enter the URL" required ></b-form-input>
            </b-form-group>
            <b-form-group
              description="The Site full URL."
              label="Site Name/ID"
              label-for="basicName"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicName" v-model="posts.siteid" type="text" autocomplete="name" placeholder="Enter the Site ID" required ></b-form-input>
            </b-form-group>
            <b-form-group
              description="The Owner of the Site"
              label="Owner"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="posts.Owner" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Group Chat Allowed"
              label-for="basicSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="basicSelect"
                :plain="true"
                :options="['Please select','yes', 'no']"
                value="Please select" v-model="posts.Group_Chat_Allowed" >
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="Number of Users Allowed"
              label-for="basicTextarea"
              :label-cols="3"
              :horizontal="true">
              <b-form-input v-model="posts.Number_of_users" id="basicTextarea" :textarea="true" :rows="9" placeholder="Max Users Allowed"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Number of Messages Allowed"
              label-for="basicTextarea"
              :label-cols="3"
              :horizontal="true">
              <b-form-input v-model="posts.Max_messages_Allowed" id="basicTextarea" :textarea="true" :rows="9" placeholder="Max Messages Allowed"></b-form-input>
            </b-form-group>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button v-on:click="delData()" type="submit" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
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
  var key = link.split("sites/",24).pop()
  console.log(key)

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
      // posts: [],
      errors: [],
      posts: {
                    product_name: "",
                    subtitle: "",
                    short_description: "",
                    long_description: "",
                    price: "",
                    keywords: "",
                    search_keywords:"",
                    _id: key

                },
                response: "",
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
    axios.get(`https://selacious-cloud-siteapi.herokuapp.com/sites/${key}`)
    .then(response => {this.posts = response.data})
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
    async updateData() {
      axios.put(`https://selacious-cloud-siteapi.herokuapp.com/sites/${key}`,this.posts).then((response) =>{
        console.log(response);
        this.$router.push("/sites");
      });
    },
    async delData() {
                axios({ method: "DELETE", "url": `https://selacious-cloud-siteapi.herokuapp.com/sites/${key}`, "data": this.posts, "headers": { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(result => {
                    this.posts = result.data;
                    this.$router.push("/sites");
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
