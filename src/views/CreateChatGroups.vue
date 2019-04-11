<template>
  <b-row>
      <b-col md="12">




        <b-card>
          <b-form action="inventories" v-on:submit.prevent="sendData">
            <div slot="header">
              <strong>Create</strong> Chat Group
            </div>
            <b-form-group
              description="Enter the Site"
              label="Site Id"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">



              <cool-select
                v-model="input.room_site"
                :items="items"
                :loading="loading"
                item-text="siteid"
                placeholder="Just Type The Site ID/Name"
                disable-filtering-by-search
                @search="onSearch"
                >
              </cool-select>
            </b-form-group>
            <b-form-group
              description="Enter the Room Name"
              label="Room Name"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.room_name" type="text" placeholder="Enter the room Name"></b-form-input>
            </b-form-group>


            <b-form-group
              description="Allowed Users"
              label="Allowed Users"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-col cols="13" v-for="(run, index) in input.allowed_users" :key="index">

              <cool-select
                v-model="input.allowed_users[index]"
                :items="items2"
                :loading="loading"
                item-text="name"
                placeholder="Enter The User ID"
                disable-filtering-by-search
                @search="onSearch2"
                >
              </cool-select><br>
              </b-col>
            </b-form-group>
            <b-button class="float-right"  @click="deleteuser()" size="sm" variant="danger"><i class="fa fa-ban"></i> - Delete User</b-button>
            <b-button class="float-right" type="button" @click="adduser()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> + Add User</b-button>
            <br><br>
            <b-form-group
              description="Group Admins"
              label="Group Admins"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-col cols="13" v-for="(run, index) in input.group_admins" :key="index">

              <cool-select
                v-model="input.group_admins[index]"
                :items="items3"
                :loading="loading"
                item-text="name"
                placeholder="Enter The Admin ID"
                disable-filtering-by-search
                @search="onSearch3"
                >
              </cool-select><br>
              </b-col>
            </b-form-group>
            <b-button class="float-right"  @click="deleteadmin()" size="sm" variant="danger"><i class="fa fa-ban"></i> - Delete Admin</b-button>
            <b-button class="float-right" type="button" @click="addadmin()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> + Add Admin</b-button>
            <br><br>

            <b-form-group
              label="Only Admins can Send Messages"
              label-for="basicRadiosCustom"
              :label-cols="3"
              :horizontal="true">
              <b-form-radio-group
                id="basicRadiosCustom"
                value="1"
                stacked>
                <div class="custom-control custom-radio">
                  <input type="radio" v-model="input.only_admins" id="customRadio1" name="customRadio" class="custom-control-input" value="yes">
                  <label class="custom-control-label" for="customRadio1">Yes</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" v-model="input.only_admins" id="customRadio2" name="customRadio" class="custom-control-input" value="no" checked>
                  <label class="custom-control-label" for="customRadio2">No</label>
                </div>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group
              description="Emergency Contacts"
              label="Emergency Contacts"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-col cols="13" v-for="(run, index) in input.emergency_contacts" :key="index">

              <cool-select
                v-model="input.emergency_contacts[index]"
                :items="items4"
                :loading="loading"
                item-text="name"
                placeholder="Enter The Contacts ID"
                disable-filtering-by-search
                @search="onSearch4"
                >
              </cool-select><br>
              </b-col>
            </b-form-group>
            <b-button class="float-right"  @click="deletecontact()" size="sm" variant="danger"><i class="fa fa-ban"></i> - Delete Contact</b-button>
            <b-button class="float-right" type="button" @click="addcontact()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> + Add Contact</b-button>
            <br><br><br>


             <div slot="footer">
                <b-button  type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                <router-link :to="{ path: '/chatgroups',}">
                <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                </router-link>


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
  import { CoolSelect } from 'vue-cool-select'
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
      loading: false,
      timeoutId: null,
      noData: false,
      myvals:[],
      inventorys: [],
      resp: [],
      errors: [],
      input: {
                    id:"",
                    room_name: "",
                    room_site: "",
                    allowed_users: [],
                    group_admins: [],
                    only_admins:"",
                    emergency_contacts:[],
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
    axios.get("https://selacious-cloud-siteapi.herokuapp.com/chats")
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
            console.log("trigger");
            axios.post("https://selacious-cloud-siteapi.herokuapp.com/chats/",this.input).then((response) =>{
              console.log(response);
              this.$router.push("/chatgroups");
            });
      },
      async onSearch(search) {
      const lettersLimit = 2;

      this.noData = false;
      if (search.length < lettersLimit) {
        this.items = [];
        this.loading = false;
        return;
      }
      this.loading = true;

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(async () => {
        const response = await fetch(
          `https://selacious-cloud-siteapi.herokuapp.com/sites`
        );

        this.items = await response.json();
        this.loading = false;

        if (!this.items.length) this.noData = true;

        console.log(this.items);
      }, 500);
    },

    async onSearch2(search) {
    const lettersLimit = 2;

    this.noData = false;
    if (search.length < lettersLimit) {
      this.items2 = [];
      this.loading = false;
      return;
    }
    this.loading = true;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      const response = await fetch(
        `https://selacious-cloud-siteapi.herokuapp.com/users`
      );

      this.items2 = await response.json();
      this.loading = false;

      if (!this.items2.length) this.noData = true;

      console.log(this.items2);
    }, 500);
  },
  async onSearch3(search) {
  const lettersLimit = 2;

  this.noData = false;
  if (search.length < lettersLimit) {
    this.items3 = [];
    this.loading = false;
    return;
  }
  this.loading = true;

  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(async () => {
    const response = await fetch(
      `https://selacious-cloud-siteapi.herokuapp.com/users`
    );

    this.items3 = await response.json();
    this.loading = false;

    if (!this.items3.length) this.noData = true;

    console.log(this.items3);
  }, 500);
},

async onSearch4(search) {
const lettersLimit = 2;

this.noData = false;
if (search.length < lettersLimit) {
  this.items4 = [];
  this.loading = false;
  return;
}
this.loading = true;

clearTimeout(this.timeoutId);
this.timeoutId = setTimeout(async () => {
  const response = await fetch(
    `https://selacious-cloud-siteapi.herokuapp.com/users`
  );

  this.items4 = await response.json();
  this.loading = false;

  if (!this.items4.length) this.noData = true;

  console.log(this.items4);
}, 500);
},
  adduser: function () {
 this.input.allowed_users.push("");
  },
  deleteuser: function(index) {
  this.input.allowed_users.splice(index, 1);
  },
  addadmin: function () {
 this.input.group_admins.push("");
  },
  deleteadmin: function(index) {
  this.input.group_admins.splice(index, 1);
  },
  addcontact: function () {
 this.input.emergency_contacts.push("");
  },
  deletecontact: function(index) {
  this.input.emergency_contacts.splice(index, 1);
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
