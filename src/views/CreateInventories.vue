<template>
  <b-row>
      <b-col md="12">




        <b-card>
          <b-form action="inventories" v-on:submit.prevent="sendData">
            <div slot="header">
              <strong>Create</strong> Inventory
            </div>
            <b-form-group
              description="Enter the User Id"
              label="User Id"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">



              <cool-select
                v-model="input.seller"
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
              <b-form-input id="basicText" v-model="input.product_id" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Expiration Date of the Product"
              label="Expiration Date"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.expiry_date" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Batch Number"
              label="Batch No."
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.Batch_No" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              description="UPC Code"
              label="UPC Code"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.UPC_code" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              description="The Shelf Life of the Product"
              label="Shelf Life"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.shelf_life" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Status of the Product"
              label="Product Status"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.status" type="text"></b-form-input>
            </b-form-group>
            <b-form-group
              description="Warehouse where the Product is Currently"
              label="Warehouse"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="basicText" v-model="input.warehouse" type="text"></b-form-input>
            </b-form-group>

             <div slot="footer">
                <b-button  type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                <router-link :to="{ path: '/inventories',}">
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
      loading: false,
      timeoutId: null,
      noData: false,
      myvals:[],
      inventorys: [],
      resp: [],
      errors: [],
      input: {
                    seller: "",
                    product_id: "",
                    expiry_date: "",
                    Batch_No: "",
                    UPC_code: "",
                    shelf_life: "",
                    status:"",
                    warehouse:""
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
            console.log("trigger");
            axios.post("https://selacious-cloud-siteapi.herokuapp.com/inventories/",this.input).then((response) =>{
              console.log(response);
              this.$router.push("/inventories");
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
