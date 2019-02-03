'use strict';
var  mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;



var SellerSchema = new Schema({
  name:{
    type:String,
    default:"username",
  },

});

module.exports = mongoose.model('sel_Seller', SellerSchema);
