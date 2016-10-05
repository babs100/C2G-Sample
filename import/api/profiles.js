import {Meteor} from 'meteor/meteor' ;
import {check} from 'meteor/check' ;

import {Profiles} from '../collections/profile.js' ;

Meteor.methods({

    'profile.create'(profile, userId)
    {
        var pid  ;
       // console.log(profile.givenName) ;
        /*
        check(profile,
            {
                givenName:String,
                familyName:String,
                email:String,
                imageUrl:String,
                googleId:String


            }
        ) ;
        */
        pid = Profiles.insert(
            {
                firstname : profile.givenName,
                lastname: profile.familyName,
                email: profile.email,
                imageUrl : profile.imageUrl,
                googleId :profile.googleId,
                userId : userId,
                reviewed:false,
                processed:false,
                createdAt: new Date()


            }
        );
        return pid ;
    },

    'profile.update'(pId,appDocUrl,certPdfUrl, imageUrl, gender,state, occupation ,googleId, userId)
    {
        check(
            {
                appDocUrl:String,
                certPdfUrl:String,
                occupation:String,
                imageUrl:String,
                googleId:Number,
                userId:Number,
                state: String,
                gender : gender

            }
        ) ;
        Profiles.update(pId,
            {
                
                imageUrl : imageUrl,
                appDocUrl : appDocUrl,
                certPdfUrl: certPdfUrl,
                googleId :googleId,
                userId : userId,
                gender:gender,
                state: state,
                occupation:occupation


            }
        );
    }
    

});
