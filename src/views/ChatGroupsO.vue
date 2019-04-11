<template>
  <b-row>
      <b-col md="12">
        <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Inventory</strong>
            </div>
            <b-list-group>
              <b-list-group-item href="#"  class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{chats.room_name}}</h5>
                  <!-- <small>{{inventorys.expiry_date}}</small> -->
                </div>
                <p class="mb-1">
                  {{chats.room_site}}
                </p>
                <!-- <small>{{inventorys.UPC_code}}</small> -->
              </b-list-group-item>
            </b-list-group>
          </b-card>


        <b-card>
          <div slot="header">
            <strong>Update/Delete</strong> Inventory
          </div>
          <b-form v-on:submit.prevent="updateData">

            <b-form-group
              label="Current Site Id"
              label-for="basicInputDisabled"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicInputDisabled" type="text" :value="chats.room_site" :disabled="true" placeholder="Site Id"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Enter the Site"
              label=" Update Site Id"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">



              <cool-select
                v-model="chats.room_site"
                :items="items"
                :loading="loading"
                item-text="siteid"
                item-value="_id"
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
              <b-form-input id="basicText" v-model="chats.room_name" type="text" placeholder="Enter the room Name"></b-form-input>
            </b-form-group>

            <b-form-group
            label=" Current Allowed Users"
            label-for="tags"
            :label-cols="3"
            :horizontal="true">
            <b-col cols="13" v-for="(run, index) in test.allowed_users">
              <b-form-input :disabled="true"  :value="test.allowed_users[index]"></b-form-input>
            </b-col>
          </b-form-group>
            <b-form-group
              description="Allowed Users"
              label="Allowed Users"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-col cols="13" v-for="(run, index) in chats.allowed_users" :key="index">
              <cool-select
                v-model="chats.allowed_users[index]"
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
            label=" Current Group Admins"
            label-for="tags"
            :label-cols="3"
            :horizontal="true">
            <b-col cols="13" v-for="(run, index) in test.group_admins">
              <b-form-input :disabled="true"  :value="test.group_admins[index]"></b-form-input>
            </b-col>
          </b-form-group>
            <b-form-group
              description="New Group Admins"
              label="Group Admins"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-col cols="13" v-for="(run, index) in chats.group_admins" :key="index">

              <cool-select
                v-model="chats.group_admins[index]"
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
                  <input type="radio" v-model="chats.only_admins" id="customRadio1" name="customRadio" class="custom-control-input" value="yes">
                  <label class="custom-control-label" for="customRadio1">Yes</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" v-model="chats.only_admins" id="customRadio2" name="customRadio" class="custom-control-input" value="no" checked>
                  <label class="custom-control-label" for="customRadio2">No</label>
                </div>
              </b-form-radio-group>
            </b-form-group>


            <b-form-group
            label="Current Emergency Contacts"
            label-for="tags"
            :label-cols="3"
            :horizontal="true">
            <b-col cols="13" v-for="(run, index) in test.emergency_contacts">
              <b-form-input :disabled="true"  :value="test.emergency_contacts[index]"></b-form-input>
            </b-col>
          </b-form-group>


            <b-form-group
              description="New Emergency Contacts"
              label="New Emergency Contacts"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-col cols="13" v-for="(run, index) in chats.emergency_contacts" :key="index">

              <cool-select
                v-model="chats.emergency_contacts[index]"
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
  import { CoolSelect } from 'vue-cool-select'
  var link = window.location.href
  var key = link.split("chatgroups/",24).pop()
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
      chats: {
        room_name: "",
        room_site: "",
        allowed_users: [],
        group_admins: [],
        only_admins:"",
        emergency_contacts:[],
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
    axios.get(`https://selacious-cloud-siteapi.herokuapp.com/chats/${key}`)
    .then(response => {this.chats = response.data})
    axios.get(`https://selacious-cloud-siteapi.herokuapp.com/chats/${key}`)
    .then(response => {this.test = response.data})
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
      axios.put(`https://selacious-cloud-siteapi.herokuapp.com/chats/${key}`,this.chats).then((response) =>{
        console.log(response);
        this.$router.push("/chatgroups");
      });
    },
    async delData() {
                axios({ method: "DELETE", "url": `https://selacious-cloud-siteapi.herokuapp.com/chats/${key}`, "data": this.chat, "headers": { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(result => {
                    this.chats = result.data;
                    this.$router.push("/chatgroups");
                }, error => {
                    console.error(error);
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
