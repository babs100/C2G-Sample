import React, {Component, PropTypes} from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {createContainer} from 'meteor/react-meteor-data' ;
import {Applications} from '../collections/application.js' ;
import {Gmaps, Marker, InfoWindow,Circle} from 'react-gmaps' ;
import Loading from './Loading.jsx' ;


 class ApplicantsMap extends Component{
        constructor(props)
        {
            super(props) ;


            this.onMapCreated = this.onMapCreated.bind(this) ;
            //console.log('found 1 = ' + first) ;
            this.state = 
            {
                currentUser: Meteor.user(),

            }
            
            
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



        onMapCreated()
        {
            /*
            var  app = Applications.findOne({}) ;
            if(app)
            {
                console.log('find one coord in will update '+  app.email ) ;
            }

            disableDefaultUI = false ;
            */
        }
     
        renderMap()
        {
            const first = this.props.applications[0] ;
            const all = this.props.applications ;
            const center = {
                lat: first.loc.coordinates[0],
                lng: first.loc.coordinates[1],

            };
            
            return <Gmaps
                width={'100%'}
                height={'600px'}
                lat={center.lat}
                lng={center.lng}
                zoom={12}
                loadingMessage={'loading ...'}
                params={{v: '3.exp', key: 'AIzaSyCjHh_IEOf-QAJs5kSfA5yxV2mijmZ56m8'}}
                onMapCreated={this.onMapCreated} >
                {
                    all.map((app) =>
                        <Marker key={app._id}
                                lat={app.loc.coordinates[0]}
                                lng={app.loc.coordinates[1]}
                                draggable={false}
                        />
                    )
                }
                
            </Gmaps>
        }

         render() {


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
                                 {this.props.loading ? <Loading/> : this.renderMap()}
                             </div>
                             
                         </div>
                     </div>    
                 </div>    
             );


             
             
         }

        



    


}

ApplicantsMap.propTypes = {
    
    applications:   PropTypes.array.isRequired,
    loading:   PropTypes.bool.isRequired,
    
} ;

export default createContainer(() => {
    const  subscription = Meteor.subscribe('applications');
    const loading = !subscription.ready() ;
    const applications = Applications.find({}).fetch();
    return {loading, applications};
}, ApplicantsMap) ;
