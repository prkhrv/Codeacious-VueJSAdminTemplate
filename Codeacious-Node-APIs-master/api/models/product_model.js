'use strict';
var  mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;



var ProductSchema = new Schema({

  product_name  :{
    type : String,
    required: "Please Enter the Name",
  },
  uniqueid : {
    type: String ,
    default: "UniqueID",
  },
  subtitle:{
    type: String ,
    default: "subtitle",
  },
  short_description: {
    type: String,
    default: "Short description",
  },
  long_description:{
    type: String,
    default: "long description",
  },
  price:{
    type:String,
    default:1000,
  },
  keywords:{
   type:[String],
   default:"N/A",
  },
  search_keywords:{
    type:[String],
    default:"search_keywords",
  }
});

module.exports = mongoose.model('sel_Product', ProductSchema);
