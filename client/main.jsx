import React from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {render} from 'react-dom' ;

import {renderRoutes} from './routes.jsx'
Meteor.startup(
    () => {
        //
        
        render(renderRoutes(), document.getElementById('app-target')) ;
       // GoogleMaps.load({key: 'AIzaSyCjHh_IEOf-QAJs5kSfA5yxV2mijmZ56m8'}) ;
    }
);