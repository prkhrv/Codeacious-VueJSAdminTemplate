'use strict';
var  mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;


// Product Schema

var InventorySchema = new Schema({

  product:[
    {type:Schema.Types.ObjectId,ref:'sel_Product'}],
  seller:
  {
    type:Schema.Types.ObjectId,
    ref:'sel_Seller',
    required:"Please give seller ID"
  },

  product_id:{
    type:String,
    default:"id",
  },
  expiry_date:{
    type:Date,
    default: Date.now,
  },
  Batch_No:{
    type: String,
    default:"Batch_number",
  },
  UPC_code:{
    type:String,
    default:"UPC_code"
  },
  shelf_life:{
    type:String,
    default:"shelf_life",
  },
  status:{
    type:String,
    default:"prod_status",
  },
  warehouse:{
    type:String,
    default:"prod_warehouse",
  },
});

InventorySchema.index({ product: 1, seller: 1}, { unique: true });

module.exports = mongoose.model('sel_Inventory',InventorySchema);
