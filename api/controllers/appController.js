var UsersInfo = require('../models/appModel.js');

var crypto = require('crypto')
var axios = require("axios");
algorithm = 'aes-256-ctr';
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

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
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
                 body='<?xml version="1.0" encoding="utf-8"?><Request><username>opoku</username><password>ba33911357</password><type>longSMS</type><GSM>233548867947</GSM><sender>Boto</sender><SMSText>'+vcodegen+'</SMSText></Request>'
                request.post(
                    {url:'http://107.20.199.106/api/v3/sendsms/plain?',
                    body : req.rawBody,
                    headers: {'Content-Type': 'aplication/xml'}
                    },
                    function (error, response, body) {        
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                        }
                        else{
                            console.log("Error")
                            console.log(error)
                            
                            
                        }
                    }
                );
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


exports.createWallet = function(req, res) {
    // Create and Save a new Note
    if(!req.body.password) {
        res.status(400).send({message: "Phone can not be empty"});
        console.log("Phone can not be empty");
    }
   else {
    

var pom={};


       axios.post('http://5.150.236.20:8081/operator/wallets', {
        password: 'red red red red red '
        
      })
      .then(function (response) {
        console.log(response);

       
pom['id']=response.data


      axios({
        method: 'post',
        url: 'http://5.150.236.20:8081/operator/wallets/'+response.data.id +'/addresses',
        headers: {
          'password': 'red red red red red '
        
        }
      }) .then(function (response1) {
        console.log(response1.data);
       pom['address']=response1.data;
        res.send(pom)
      })
      .catch(function (error) {
        console.log(error);
      });





      })
      .catch(function (error) {
        console.log(error);
      });
}
    
    
};