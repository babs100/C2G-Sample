import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base' ;
import  {States}  from '../import/collections/state.js' ;
import  {Applications}  from '../import/collections/application.js' ;

Meteor.startup(() => {
  // code to run on server at startup

    process.env.MAIL_URL = 'smtp://tundesample%40gmail.com:Sample-2016@smtp.gmail.com:465' ;
    var reviewerExist = Meteor.users.find({'profile.userType':2}, {limit:1}).count() > 0;
    if(!reviewerExist) // reviewer account doesnt exist
    {
        Accounts.createUser({email:'babatunde@gmail.com', password:'babatunde2016', profile : {userType:2}}) ;
    }

    var processorExist = Meteor.users.find({'profile.userType':3},{limit:1}).count() > 0;
    if(!processorExist) // processor account doesnt exist
    {
       Accounts.createUser({email:'obabs78@gmail.com', password:'olajide2016', profile : {userType:3}}) ;
    }

    var statesExist = States.find({}).count() > 0;

    if(!statesExist) // state does not exist
    {
        var statelist =
            [
                {"sn": 1,"code":"AB","name":"Abia","zone":"SE"},
                {"sn": 2,"code":"AD","name":"Adamawa","zone":"NE"},
                {"sn": 3,"code":"AQ","name":"Akwa-Ibom","zone":"SS"},
                {"sn": 4,"code":"AN","name":"Anambra","zone":"SE"},
                {"sn": 5,"code":"BA","name":"Bauchi","zone":"NE"},
                {"sn": 6,"code":"BY","name":"Bayelsa","zone":"SS"},
                {"sn": 7,"code":"BN","name":"Benue","zone":"NC"},
                {"sn": 8,"code":"BR","name":"Borno","zone":"NE"},
                {"sn": 9,"code":"CR","name":"Cross-River","zone":"SS"},
                {"sn": 10,"code":"DL","name":"Delta","zone":"SS"},
                {"sn": 11,"code":"EB","name":"Ebonyi","zone":"SS"},
                {"sn": 12,"code":"ED","name":"Edo","zone":"SS"},
                {"sn": 13,"code":"EK","name":"Ekiti","zone":"SW"},
                {"sn": 14,"code":"EN","name":"Enugu","zone":"SE"},
                {"sn": 15,"code":"GB","name":"Gombe","zone":"NW"},
                {"sn": 16,"code":"IM","name":"Imo","zone":"SE"},
                {"sn": 17,"code":"JI","name":"Jigawa","zone":"NE"},
                {"sn": 18,"code":"KA","name":"Kaduna","zone":"NW"},
                {"sn": 19,"code":"KN","name":"Kano","zone":"NW"},
                {"sn": 20,"code":"KT","name":"Katsina","zone":"NW"},
                {"sn": 21,"code":"KB","name":"Kebbi","zone":"NW"},
                {"sn": 22,"code":"KG","name":"Kogi","zone":"NC"},
                {"sn": 23,"code":"KW","name":"Kwara","zone":"NC"},
                {"sn": 24,"code":"LA","name":"Lagos","zone":"SW"},
                {"sn": 25,"code":"NA","name":"Nasarawa","zone":"NC"},
                {"sn": 26,"code":"NG","name":"Niger","zone":"NC"},
                {"sn": 27,"code":"OG","name":"Ogun","zone":"SW"},
                {"sn": 28,"code":"OD","name":"Ondo","zone":"SW"},
                {"sn": 29,"code":"OS","name":"Osun","zone":"SW"},
                {"sn": 30,"code":"OY","name":"Oyo","zone":"SW"},
                {"sn": 31,"code":"PL","name":"Plateau","zone":"NC"},
                {"sn": 32,"code":"PH","name":"Rivers","zone":"SS"},
                {"sn": 33,"code":"SO","name":"Sokoto","zone":"NW"},
                {"sn": 34,"code":"TA","name":"Taraba","zone":"NE"},
                {"sn": 35,"code":"YO","name":"Yobe","zone":"NE"},
                {"sn": 36,"code":"ZA","name":"Zamfara","zone":"NW"},
                {"sn": 37,"code":"FC","name":"FCT","zone":"NC"}
            ] ;

        statelist.forEach( function (data) {
            States.insert(data) ;
        });
        
    }
    Meteor.publish('applications', ()=> Applications.find());

});
