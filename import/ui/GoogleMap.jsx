import React, {Component, PropTypes} from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {createContainer} from 'meteor/react-meteor-data' ;




 export default class GoogleMap extends Component{

       

        componentDidMount()
        {
            GoogleMaps.create(
                {
                    name : this.props.name ,
                    element : document.getElementById('map-container') ,
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
         return(<div id="map-container" className="map-container"></div>) ;
     }

        



    


}

GoogleMap.propTypes = {
        name:       PropTypes.string.isRequired,
        options:   PropTypes.object.isRequired,
        
} ;
