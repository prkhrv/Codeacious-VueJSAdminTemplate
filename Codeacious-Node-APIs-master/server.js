var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  //created model loading here
  Product = require('./api/models/product_model');
  Listing = require('./api/models/listing_model');
  User = require('./api/models/user_model');
  Inventory = require('./api/models/inventory_model');

// ******************************************************************
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dbConfig = require('./config/database.config.js');
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex:true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

var cors = require('cors')

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

const routes = require('./api/routes/product_routes'); //importing route
app.use('/', routes) //register the route


app.listen(port);


console.log(' RESTful API server started on: ' + port);
