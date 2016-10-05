import {Meteor} from 'meteor/meteor' ;
import {Email} from 'meteor/email' ;
import {Accounts} from 'meteor/accounts-base' ;
import  {Profiles} from '../import/collections/profile.js' ;
import  {Applications} from '../import/collections/application.js' ;


Meteor.methods({
    'sendMail'(to, from, subject, text) {
        //check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    },

    'sendEmailToProcessor'(from, subject, text) {
        //check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        var to = Meteor.users.findOne({'profile.userType':3}).emails[0].address ;
        //console.log('to: ' + to) ;
        this.unblock();
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    },
    
    'sendSMS'(smsBody, toNumber) {
        //twilio =  Twilio(ACCOUNT_SID, AUTH_TOKEN);
        var twilio =  Twilio('ACf1ff0077c3576fbb01b877e2fefaad79', '7164d2815c8e1f7dac2c3af7f72d5c22');
        twilio.sendSms({
            to:toNumber, // Any number Twilio can deliver to
            //from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
            from: '+13347814774',
            body: smsBody // body of the SMS message
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs body
            }
            else{
                console.log(err) ;
            }
        });


    },

    'createUserAccount'(email)
    {
        //this.unblock() ;
        var password = email + '2016' ;
        var userId  = 0;

        //account = Meteor.users.findOne({email:email}) ;
        account = Accounts.findUserByEmail(email);
        
        if(account !== null)
        {
            //console.log(account) ;
            userId =  account._id ;
            //console.log('My User ID : ' +  userId) ;
        }
        else 
        {
            userId = Accounts.createUser({email: email, password: password, profile : {userType:1}});
            //console.log('New User ID : ' +  userId) ;
        }
        
        
        return userId ;
    },
    
    'uploadImageFromUrl'(url, profileId)
    {
        //console.log('profile id = ' + profileId ) ;
        //this.unblock() ; //async
        //this could only be done efficiently in server  
        Images.insert(url, function (error, fileObj) {
            if(error){
                
            }else {
                
                //console.log('file object id = ' + fileObj._id) ;
                var  image = { url : '/cfs/files/images/' + fileObj._id } ;
                Profiles.update(profileId, {$set: { image }}) ;
            }

        });
        
    },

    'addGeoCodeToApplication'(applicationId, address)
    {
        var geoCoder = new GeoCoder() ;
        var code = geoCoder.geocode(address) ;

        //console.log(code) ;
        Applications.update(applicationId,
            {
                $set : {loc: {type : 'point', coordinates : [code[0].latitude, code[0].longitude]}}
            }
        );

    }

});


