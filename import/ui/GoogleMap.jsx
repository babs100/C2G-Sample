import React, {Component, PropTypes} from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {createContainer} from 'meteor/react-meteor-data' ;
import {Applications} from '../collections/application.js' ;
import Apps from './Apps.jsx' ;
import {Profiles} from '../collections/profile.js' ;

import {Modal, Nav, Grid, Glyphicon, NavItem, Table, SplitButton, MenuItem, Button} from 'react-bootstrap' ;


 export default class GoogleMap extends Component{

        constructor(props)
        {
                super(props) ;

                
        }

        componentDidMount()
        {
            GoogleMaps.create(
                {
                    name : this.props.name ,
                    element : React.findDOMNode(this) ,
                    options: this.props.options,
                }
            );

            GoogleMaps.ready(this.props.name, function (map) {
                var maker = new google.maps.Marker({
                    position:map.options.center,
                    map:map.instance,
                });
            })
        }

        compnentWillUnmount(){
            if(GoogleMaps.maps[this.props.name])
            {
                google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance) ;
                delete GoogleMaps.maps[this.props.name] ;
            }
        }

     render()
     {
         return(<div clasName="map-container"></div>) ;
     }

        



    


}

GoogleMap.propTypes = {
        name:       PropTypes.string.isRequired,
        options:   PropTypes.object.isRequired,
        
} ;
