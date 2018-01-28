var UsersInfo = require('../models/appModel.js');

var crypto = require('crypto'),

algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function encrypt(text){
var cipher = crypto.createCipher(algorithm,password)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
}

function decrypt(text){
var decipher = crypto.createDecipher(algorithm,password)
var dec = decipher.update(text,'hex','utf8')
dec += decipher.final('utf8');
return dec;
}

function getRandomInt(max) {
  var randtex="";
  for(var i=0;i<max;i++ ){
  randtex += Math.floor(Math.random() * Math.floor(max));
}
  return randtex;
}

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body.phone) {
        res.status(400).send({message: "Phone can not be empty"});
        console.log("Phone can not be empty");
    }
   else {
		
    var usersInfo = new UsersInfo({phone: req.body.phone,vcode: getRandomInt(4)});

    usersInfo.save(function(err, data) {
        //console.log(data);
        if(err) {
			console.log(err.code);
			if(err.code==11000){
				UsersInfo.find({"phone":req.body.phone}, function(err, user) {
        if(err) {
            res.status(500).send({message: "Could not find a note with id "});
        }
        
        if(user[0].status=='pending')
        {
			 
			 
			 var vcodegen=getRandomInt(4)
			 user[0].vcode=vcodegen
			 
			 UsersInfo.update({_id:user[0]._id}, {$set:{vcode:vcodegen}},function(err, data){
            
             if(err) {
                res.status(500).send({message: "Could not update note with id"});
             } 
             else {
               
				 res.send(user);
             }
        }); 
			  
		}
		else{
			res.status(500).send({message: "Already in database"});
			
		}
        //note.content = req.body.content;
/*
       */
    });
			}
			else{
            res.status(500).send({message: "Some error occurred while creating the Note."});
		}
        } else {
            res.send(data);
        }
    });
}
    
    
};
