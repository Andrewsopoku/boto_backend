'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserInfo = new Schema({
  name: {
    type: String
    //required: 'Kindly enter the name of the task'
  },
  vcode:{
	 type: String,
	 required: 'required' 
  },
  phone:{
  type: String,
  required:'required',
  unique:true
  },
  password:{
	  type:String
	  
  },
  recovery:{
	 type:String 
	}  
  ,
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('UsersInfo', UserInfo);

