'use strict';
var  mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;



var ListingSchema = new Schema({
  product:[
    {type:Schema.Types.ObjectId,ref:'sel_Product'}],
  seller:[
    {type:Schema.Types.ObjectId,ref:'sel_Seller'}],
});


module.exports = mongoose.model('sel_Listing', ListingSchema);
