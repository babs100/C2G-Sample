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

                this.state = {

                    currentUser : Meteor.user(),

                };




                
        }

        
        static guard()
        {
            if(!Meteor.user() && !Meteor.user().profile.userType == 2 )
            {
                this.props.history.push('/login') ;
            }   
        }

         componentDidMount()
         {
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

        render()
        {
                
                const navbar = (
                    <nav  className="navbar navbar-default navbar-fixed-top navbar-custom">
                            <div className="container">
                                    <div className="navbar-header page-scroll">

                                            <a className="navbar-brand" href="#">Applicants Geolocations </a>
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

                const dash = (
                    <div className="well">
                            <div className="row ">
                                    <div className="col-sm-12">

                                        <h1>Applicants Geolocations Map</h1>
                                    </div>

                            </div>

                    </div>

                ) ;
                return(

                    <div className="container my_container">
                            {navbar}
                            
                            <div className="row content">
                                    <div className="col-sm-12 dash_container">
                                            {dash}
                                     </div>
                                    <div className="col-sm-12 ">
                                        <Map google={window.google}
                                             style={{width: '100%', height: '100%', position: 'relative'}}
                                             className={'map'}
                                             zoom={14}>
                                            
                                        </Map>

                                    </div>
                                
                            </div>
                            
                            
                                


                            


                    </div>  
                    




                ) ;
        }

    


}

/*
ReviewHome.propTypes = {
        profiles:       PropTypes.array.isRequired,
        applications:   PropTypes.array.isRequired,
        pendingCount :  PropTypes.number.isRequired,
        profileCount :  PropTypes.number.isRequired,
        reviewedCount : PropTypes.number.isRequired,
        rejectedCount : PropTypes.number.isRequired,
} ;
export default createContainer(() => {
        return {
                applications:Applications.find({}, { sort:{createdAt:-1}}).fetch(),
                profileCount:Profiles.find({}).count(),
                profiles:Profiles.find({}).fetch(),
                pendingCount : Applications.find({reviewStatus:0}).count(),
                reviewedCount : Applications.find({reviewStatus:1}).count(),
                rejectedCount : Applications.find({reviewStatus:2}).count(),


        };
}, ReviewHome) ;
*/    