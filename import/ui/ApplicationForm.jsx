import React, {Component, PropTypes} from 'react' ;
//import {Grid, Image,Jumbotron, Row, Col,Form, Button, Panel,FormGroup, ControlLabel,FormControl} from 'react-bootstrap' ;
import ReactDOM from 'react-dom' ;
import {Profiles} from '../collections/profile.js' ;
import {States} from  '../collections/state.js' ;
import {Applications} from  '../collections/application.js' ;

export default class ApplicationForm extends Component{

    constructor(props)
    {
        super(props) ;

        var errors = [] ;
        var profileId = Session.get('profileId') ;
        const states = States.find({}) ;
        this.state = {
            profileId : profileId,
            states : states,
            errors : errors,
            type : '',
            score : 0,
            mode : '',
            ngstate : '',
            address : ''

        }
    }


    static guard(nextState, replace)
    {
        const profileId = Session.get('profileId') ;
        const profile = Profiles.findOne(profileId) ;

        //console.log('profile Id  = ' + profileId) ;
        //console.log('profile  = \n' + profile.email) ;
        if(!profile || profile.completed == false)
        {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        
    }



    renderNigerianStates()
    {
        let states = this.state.states ;

        return states.map((state) => (
            <option key={state._id} value={state.name}>{state.name}</option>
        ) ) ;
    }

    clearErrors()
    {
        $('form .form-group').removeClass('has-error') ;
        this.state.errors = [] ;
        $('#error-list').html('') ;
        $('#error-alert').removeClass('alert') ;

    }

    showErrors()
    {
        this.state.errors.forEach((error)=>
        {
            $('#error-list').append('<li>' + error + '</li>') ;
        });

        $('#error-alert').addClass('alert') ;
    }

    validateFormFields()
    {
        this.clearErrors() ;

        var type = $('#type').val().trim() ;
        var score = $('#score').val().trim() ;
        var mode = $('input[name=mode]:checked').val();
        var ngstate = $('#state').val().trim() ;
        var address = $('#address').val().trim() ;
        var phone = $('#phone').val().trim() ;




        let formValid = true ; // assume all forms field are valid

        let typeValidation = validateFilled(type, 'Licence Type') ;
        let scoreValidation = validateRange(score,1, 100,  'Test Score') ;
        let modeValidation = validateFilled(mode,  'Mode') ;
        let stateValidation = validateFilled(ngstate, 'State') ;
        let addressValidation = validateFilled(address, 'Address') ;
        let phoneValidation = validatePhone(phone, 'Phone-Number') ;

        //console.log('phone = '+ phone);

        if(typeValidation.valid == false)
        {

            this.state.errors.push(typeValidation.message)   ;
            $('#type').closest('.form-group').addClass('has-error') ;

            formValid = false ;

        }

        if(scoreValidation.valid === false)
        {
            this.state.errors.push(scoreValidation.message)   ;
            $('#score').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }

        if(modeValidation.valid === false)
        {
            //messages += ngstateValidation.message + '\n' ;
            this.state.errors.push(modeValidation.message)   ;
            $('input[name=mode]').closest('.form-group').addClass('has-error') ;

            formValid = false ;
        }

        if(stateValidation.valid === false)
        {
            //messages += ngstateValidation.message + '\n' ;
            this.state.errors.push(stateValidation.message)   ;
            $('#state').closest('.form-group').addClass('has-error') ;

            formValid = false ;
        }

        if(addressValidation.valid === false)
        {
            //messages += addressValidation.message + '\n' ;
            this.state.errors.push(addressValidation.message)   ;
            $('#address').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }

        if(phoneValidation.valid === false)
        {
            //messages += addressValidation.message + '\n' ;
            this.state.errors.push(phoneValidation.message)   ;
            $('#phone').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }



        return {status :formValid, messages: '' }  ;
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

        
        var type = $('#type').val().trim() ;
        var score = $('#score').val().trim() ;
        var mode = $('input[name=mode]:checked').val();
        var ngstate = $('#state').val().trim() ;
        var address = $('#address').val().trim() ;
        var phonenumber = $('#phone').val().trim() ;
        
        var profileId = Session.get('profileId') ;
        //console.log('mode = ' + mode ) ;
        //Profiles.update(profileId, { $set : {state: ngstate, address: address, phone:phonenumber}}) ;

        const application_id = Applications.insert({
                profileId : profileId,
                type : type,
                score: score,
                state: ngstate,
                mode : mode,
                address : address,
                phone:phonenumber,
                reviewStatus : 0,
                processStatus: 0,
                createdAt : new Date(),
                completed:true,
            
        }) ;
        
        Meteor.call('addGeoCodeToApplication', application_id , address) ;

        Session.set('profileId', this.state.profileId) ;
        this.props.history.push('/status') ;
    }

    render()
    {
        return(

             <div className="">
                 
                 <div className="panel_container">
                 <div className="panel panel-default" style={{marginTop:20}}>
                     <div className="page-header">
                        Complete your vehicle licence application
                     </div>
                     <div className="panel-body">
                         <div className=" alert-danger" id="error-alert">
                             <ul id="error-list">

                             </ul>
                         </div>
                         <div>
                             <form role="form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="row">

                                    <div className="col-sm-6">



                                        <div className="form-group">
                                            <label  className="control-label">Select Licence Type: * </label>
                                            <select id="type" name="type" ref="type" className="form-control " placeholder="Select Gender" tabIndex="1">
                                                <option value="">Select...</option>
                                                <option value="Articulated Vehicle">Articulated Vehicle</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Private">Private</option>
                                                <option value="Motorcycle">Motorcycle</option>

                                            </select>

                                        </div>

                                        <div className="form-group">
                                            <label  className="control-label">Test Score: * </label>
                                            <input type="text" id="score" name="score" ref="score" className="form-control" placeholder="0 - 100" tabIndex="2"/>
                                        </div>

                                        <div className="form-group">
                                            <label  className="control-label">Select State: * </label>
                                            <select id="state" name="state" ref="state" className="form-control " placeholder="State" tabIndex="3">
                                                <option value="">Select...</option>
                                                {this.renderNigerianStates()}

                                            </select>

                                        </div>

                                        

                                    </div>

                                     <div className="col-sm-6">
                                         <div className="form-group">
                                             <label  className="control-label">Mode : * </label>
                                             <div className="">
                                                 <label className="radio-inline"><input type="radio"  name="mode" ref="mode" value="first-time" checked readOnly/>First-Time</label>
                                                 <label className="radio-inline"><input type="radio"  name="mode" ref="mode" value="renewal"  readOnly/>Renewal</label>
                                             </div>    
                                             
                                             
                                         </div>

                                         <div className="form-group">
                                             <label  className="control-label">Contact-Address: * </label>
                                             <textarea className="form-control" rows="3" id="address" name="address" ref="address"  tabIndex="5" />

                                         </div>
                                         <div className="form-group">
                                             <label  className="control-label">Phone-Number: * </label>
                                             <input type="text" placeholder="080812345678" className="form-control" rows="3" id="phone" name="phone" ref="phone"  tabIndex="6" />

                                         </div>
                                         

                                     </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Submit</button>
                                        </div>

                                    </div>

                                 </div>


                             </form>
                         </div>


                     </div>
                 </div>
                 </div>   
             </div>




        ) ;
    }
    
    

}