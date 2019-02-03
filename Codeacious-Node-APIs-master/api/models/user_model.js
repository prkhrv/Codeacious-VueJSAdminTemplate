'use strict';
var  mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;



var UserSchema = new Schema({

  name:{
    type : String,
    required: "Please Enter the name",
  },
  id : {
    type: String ,
    default: "UserID",
  },
  dob:{
    type: Date ,
    default: Date.now
  },
  email: {
    type: String,
    default: "No Email",
  },
  profile_pic:{
    type: String,
  },
  phone:{
    type:String,
  },
  category:{
    type:[{
      type:String,
      enum:['Super Admin','Client','Seller','Staff','Manufacturer','N/A'],
    }],
    default:['N/A'],
  },
  address:{
   type:[String],
   default:"N/A",
  },
});

module.exports = mongoose.model('sel_User', UserSchema);
