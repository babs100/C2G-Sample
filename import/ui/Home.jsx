import React, {Component, PropTypes} from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {Session} from 'meteor/session' ;
import {Grid, Jumbotron, Button, Glyphicon} from 'react-bootstrap' ;
import {Link} from 'react-router' ;
import GoogleLogin from 'react-google-login' ;
import {Profiles} from '../collections/profile' ;
import {Applications} from '../collections/application' ;

export default class Home extends Component{
    
    constructor()
    {
        super() ;
        this.state = {
            profile : {},
            //userId: '',
            //profileId: ''
        }
    }

    handleGoogleLogin(response)
    {
        //console.log(response) ;
        const google_profile = response.profileObj ;
        var profile , application ;

        /*
        Meteor.call('createUserAccount', profile.email, function (error, result) {
            console.log('userId from Home : ' + result) ;
            Session.set('userId', result) ;
            
        }) ;
        
        userId = Session.get('userId') ;
        Meteor.call('profile.create', profile, userId, function (error, result2) {
            console.log( 'profileId from Home' + result2) ;
            Session.set('profileId', result2) ;
        }) ;
        
        */
        application = Applications.findOne({email: google_profile.email}) ;
        profile = Profiles.findOne({email: google_profile.email}) ;

        //console.log('Application \n' + application);
        //console.log('Profile \n' + profile);
        
        if(application && application.completed === true)
        {
            // if application already exist and completed for this account then proceed to application status
            window.sessionStorage.setItem('profileId', profile._id) ;
            this.props.history.push('/status') ;
        }
        else if(profile && profile.completed === true)
        {
            // if profile already and completed but no application then redirect to application
            //Session.set('profileId', profile._id) ;
            window.sessionStorage.setItem('profileId', profile._id) ;
            this.props.history.push('/application') ;
        }
        else if(profile && profile.completed === false )
        {
            // if profile exist but not completed but no application then redirect to application
            //Session.set('profileId', profile._id) ;
            window.sessionStorage.setItem('profileId', profile._id) ;
            this.props.history.push('/profile') ;
        }    
        else {
            // create a profile for this account and proceed to profile page
            profileId = Profiles.insert(
                {
                    firstname : google_profile.givenName,
                    lastname: google_profile.familyName,
                    email: google_profile.email,
                    imageUrl : google_profile.imageUrl,
                    googleId :google_profile.googleId,
                    completed : false,
                    createdAt: new Date()


                }
            );
            
            window.sessionStorage.setItem('profileId', profileId) ;
            this.props.history.push('/profile') ;
        }
        
        
    }

    handleSubmit(e)
    {
        e.preventDefault() ;
        var validation = this.validateFormFields() ;
        if(validation.status == false){
            //alert(validation.messages) ;
            this.showErrors() ;
            return null ;
        }

        $('#submit-btn').button('loading') ;

        this.uploadMyFilesLocal() ;

        $('#submit-btn').button('reset') ;

        /*
         var profileImgId = this.uploadFileLocal(this.state.profile.imageUrl);
         var docImgId = this.uploadFileLocal($('#doc').get(0).files[0]);
         var pdfImgId = this.uploadFileLocal($('#pdf').get(0).files[0]);

         */

    }

    render()
    {
        return(
             <Grid>
                 <div className="shadow_box" >
                 <Jumbotron>
                     <h1>C2G Vehicle Licence Application</h1>
                     <p>This is an Example velicle licence application design for C2G. Follow the step below to complette application </p>
                     <ul>
                         <li>Login with gmail account and create a profile</li>
                         <li>Fill the Vehicle Licence application</li>
                         <li>Check back for application status</li>
                     </ul>
                     <GoogleLogin
                         clientId="990019497820-50jo75dmej9khrivtcnv4nk0pbhg40l0.apps.googleusercontent.com"
                         onSuccess={this.handleGoogleLogin.bind(this)}
                         onFailure={this.handleGoogleLogin.bind(this)}
                     >
                      <Glyphicon glyph="envelope"/> Google Sign In
                      
                     </GoogleLogin>    
                     
                     

                 </Jumbotron>
                 </div>    
             </Grid>

        ) ;
    }
    

}

