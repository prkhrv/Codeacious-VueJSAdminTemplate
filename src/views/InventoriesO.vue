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
                  <h5 class="mb-1">{{inventorys.product_id}}</h5>
                  <small>{{inventorys.expiry_date}}</small>
                </div>
                <p class="mb-1">
                  {{inventorys.Batch_No}}
                </p>
                <small>{{inventorys.UPC_code}}</small>
              </b-list-group-item>
            </b-list-group>
          </b-card>


        <b-card>
          <div slot="header">
            <strong>Update/Delete</strong> Inventory
          </div>
          <b-form v-on:submit.prevent="updateData">
            <b-form-group
              description="Enter the User Id"
              label="User Id"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">


              <cool-select
                v-model="inventorys.seller"
                :items="items"
                :loading="loading"
                item-text="name"
                placeholder="Enter The User ID"
                disable-filtering-by-search
                @search="onSearch"
                >
              </cool-select>
            </b-form-group>
          <b-form-group
            description="Enter the Product Id"
            label="Product Id"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.product_id" :value="inventorys.product_id" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Expiration Date of the Product"
            label="Expiration Date"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.expiry_date" :value="inventorys.expiry_date" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Batch Number"
            label="Batch No."
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.Batch_No" :value="inventorys.Batch_No" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="UPC Code"
            label="UPC Code"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.UPC_code" :value="inventorys.UPC_code" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="The Shelf Life of the Product"
            label="Shelf Life"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.shelf_life" :value="inventorys.shelf_life" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Status of the Product"
            label="Product Status"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.status" :value="inventorys.status" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Warehouse where the Product is Currently"
            label="Warehouse"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" v-model="inventorys.warehouse" :value="inventorys.warehouse" type="text"></b-form-input>
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
  import { CoolSelect } from 'vue-cool-select'
  var link = window.location.href
  var key = link.split("inventories/",24).pop()
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
      loading: false,
      timeoutId: null,
      noData: false,
      // inventory: [],
      errors: [],
      inventorys: {
        seller: "",
        product_id: "",
        expiry_date: "",
        Batch_No: "",
        UPC_code: "",
        shelf_life: "",
        status:"",
        warehouse:"",
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
    axios.get(`https://selacious-cloud-siteapi.herokuapp.com/inventories/${key}`)
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
    async updateData() {
      axios.put(`https://selacious-cloud-siteapi.herokuapp.com/inventories/${key}`,this.inventorys).then((response) =>{
        console.log(response);
        this.$router.push("/inventories");
      });
    },
    async delData() {
                axios({ method: "DELETE", "url": `https://selacious-cloud-siteapi.herokuapp.com/inventories/${key}`, "data": this.inventory, "headers": { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(result => {
                    this.inventorys = result.data;
                    this.$router.push("/inventories");
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
        `https://selacious-cloud-siteapi.herokuapp.com/users`
      );

      this.items = await response.json();
      this.loading = false;

      if (!this.items.length) this.noData = true;

      console.log(this.items);
    }, 500);
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
