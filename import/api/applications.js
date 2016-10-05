import {Meteor} from 'meteor/meteor' ;
import {check} from 'meteor/check' ;

import {Applications} from '../collections/application.js' ;

Meteor.methods({

    'application.create'(applicationType, testScore, mode, geodata ,googleId, userId)
    {
        
        check(
            {
                applicationType:String,
                testScore:Number,
                mode:String,
                geodata:Object,
                googleId:String,
                userId:Number,


            }
        ) ;
        Applications.insert(
            {
                applicationType : applicationType,
                testScore: testScore,
                mode: mode,
                geodata : geodata,
                googleId :googleId,
                userId : userId,
                approvalStatus:0,
                processStatus:0,
                createdAt: new Date()


            }
        );
    },

    'application.approve'(appId)
    {
       
        Applications.update(appId,
            {
                
                approvalStatus:1

            }
        );
    },

    'application.reject'(appId)
    {

        Applications.update(appId,
            {

                approvalStatus:2

            }
        );
    },

    'application.process'(appId)
    {

        Applications.update(appId,
            {

                processStatus:1

            }
        );
    },

    'application.proccessRejected'(appId)
    {

        Applications.update(appId,
            {

                processStatus:2

            }
        );
    }



});
