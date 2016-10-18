import React, {Component, PropTypes} from 'react' ;
import shouldPureComponentUpdate from 'react-pure-render/function' ;
import {mapMarkerStyle}  from '../jsStyles/mapMarkerStyle.js' ;
 export default class MapMarker extends Component{

     constructor(props)
     {
         super(props);
     }

     //shouldComponentUpdate = shouldPureComponentUpdate ;
     
     /*
     shouldComponentUpdate = shouldPureComponentUpdate ;
     
     static propTypes = {

         text:PropTypes.string,
     };

     static defaultProps = {

     };
     */

     render()
     {
         return(<div style={mapMarkerStyle} className="">
             {this.props.text}
         </div>) ;
     }

        



    


}

MapMarker.propTypes = {
    text:PropTypes.string,
}
    
