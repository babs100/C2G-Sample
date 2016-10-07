import React, {Component, PropTypes} from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {createContainer} from 'meteor/react-meteor-data' ;
import {Applications} from '../collections/application.js' ;
import GoogleMap from './GoogleMap.jsx' ;
import {Profiles} from '../collections/profile.js' ;



 export default class ApplicantsMap extends Component{

        constructor(props)
        {
                super(props) ;
                this.state = {
                    loaded : GoogleMaps.loaded() ,
                    mapOptions : GoogleMaps.loaded() && this._mapOptions,
                    currentUser: Meteor.user(),
                }


                
        }

        componentDidMount()
        {
            GoogleMaps.load() ;
        }

     doLogout(e)
     {
         e.preventDefault() ;
         Meteor.logout() ;
         this.props.history.push('/login') ;
     }

     showUserDetail()
     {
         let detail ;
         if(this.state.currentUser )
         {
             detail = <span>Welcome back!  {this.state.currentUser.emails[0].address}</span>
         }else
         {
             detail = 'Admin ';
         }

         return detail ;
     }


     _mapOptions()
        {
            return {
                center : new google.maps.LatLng(-37.8136, 144.9631),
                zoom : 8,
            }
        }

         render() {
             var theMap ;
             if (this.state.loaded)
                 theMap = <GoogleMap name="applicantsmap" options={this.state.mapOptions} />;
             else 
                 theMap = <div>Loading map...</div>;

             

             const navbar = (
                 <nav  className="navbar navbar-default navbar-fixed-top navbar-custom">
                     <div className="container">
                         <div className="navbar-header page-scroll">

                             <a className="navbar-brand" href="#">Applications Reviewer</a>
                         </div>
                         <ul className="nav navbar-nav navbar-right">
                             <li className="dropdown">
                                 <a href="return false;"  className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.showUserDetail()} <span className="caret"></span></a>
                                 <ul className="dropdown-menu">
                                     <li><a href="#" onClick={this.doLogout.bind(this)} >Logout</a></li>
                                 </ul>
                             </li>
                         </ul>


                     </div>


                 </nav>
             );
             
             return(
                 <div className="container my_container">
                     {navbar}

                     <div className="row content">
                         <div className="well">
                             <div className="row ">
                                <div className="col-sm-12">
                                    <h1>Applicants Geolocation Spread</h1>
                                </div>    
                             </div>
                         </div>
                         <div className="row">
                             <div className="col-sm-12">
                                 {theMap}
                             </div>
                             
                         </div>
                     </div>    
                 </div>    
             );
             
             
         }

        



    


}


