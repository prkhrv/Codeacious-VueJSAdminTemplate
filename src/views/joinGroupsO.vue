<template>
  <b-row>
      <b-col md="12">
        <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Join Requests</strong>
            </div>
            <b-list-group>
              <b-list-group-item href="#"  class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{join.username}}</h5>
                  <small>{{join.room_code}}</small>
                </div>
                <p class="mb-1">
                  {{join.room_id}}
                </p>
                <!-- <small>{{inventorys.UPC_code}}</small> -->
              </b-list-group-item>
            </b-list-group>
          </b-card>


        <b-card>
          <div slot="header">
            <strong>Accept/Delete</strong> Inventory
          </div>
          <b-form v-on:submit.prevent="updateData">
          <div slot="footer">
            <b-button v-on:click="delData()" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i>Accept</b-button>
          </div>
          </b-form>
            <b-button v-on:click="delData()" type="submit" size="sm" variant="danger"><i class="fa fa-ban"></i> Reject</b-button>
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
  import { CoolSelect } from 'vue-cool-select'
  var link = window.location.href
  var key = link.split("join/",24).pop()
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
    CalloutChartExample,
    CoolSelect,
  },
  data: function () {
    return {
      selected: null,
      items: [],
      items2:[],
      items3:[],
      items4:[],
      test:[],
      loading: false,
      timeoutId: null,
      noData: false,
      // inventory: [],
      errors: [],
      join: {
        username: "",
        room_code: "",
        user: "",
        room_id: "",
        user_token: "",
        _id: key,
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
    axios.get(`https://selacious-cloud-siteapi.herokuapp.com/join/${key}`)
    .then(response => {this.join = response.data})
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
    async delData() {
                axios({ method: "DELETE", "url": `https://selacious-cloud-siteapi.herokuapp.com/join/${key}`, "data": this.j, "headers": { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(result => {
                    this.join = result.data;
                    this.$router.push("/join");
                }, error => {
                    console.error(error);
                });
    },
    async updateData() {

      axios.post(`https://pv-chat-socket.herokuapp.com/app/send/notification/`,{user_token:this.join.user_token}).then((response) =>{
        console.log(response);
      });

      axios.post(`https://selacious-cloud-siteapi.herokuapp.com/chats/join/`,{_id:this.join.room_id,allowed_users:this.join.user}).then((response) =>{
        console.log(response);

        this.$router.push("/join");
      });
    },




adduser: function () {
this.chats.allowed_users.push("");
},
deleteuser: function(index) {
this.chats.allowed_users.splice(index, 1);
this.test.allowed_users.splice(index, 1);

},
addadmin: function () {
this.chats.group_admins.push("");
},
deleteadmin: function(index) {
this.chats.group_admins.splice(index, 1);
this.test.group_admins.splice(index, 1);
},
addcontact: function () {
this.chats.emergency_contacts.push("");
},
deletecontact: function(index) {
this.chats.emergency_contacts.splice(index, 1);
this.test.emergency_contacts.splice(index, 1);
},
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
