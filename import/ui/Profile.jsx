import React, {Component, PropTypes} from 'react' ;
//import {Grid, Image,Jumbotron, Row, Col,Form, Button, Panel,FormGroup, ControlLabel,FormControl} from 'react-bootstrap' ;
import {Session} from 'meteor/session' ;
import {ReactiveDict} from 'meteor/reactive-dict';
import {ReactiveVar} from 'meteor/reactive-var';
import ReactDOM from 'react-dom' ;


import {Profiles} from '../collections/profile.js' ;
import {States} from  '../collections/state.js' ;
import {If , Then, Else}  from 'react-if' ;

export default class Profile extends Component{

    constructor(props)
    {
        super(props) ;

        //let errors = new ReactiveDict("errorDict") ;

        let errors = [] ;

        //var profileId = Session.get('profileId') ;
        const profileId = window.sessionStorage.getItem('profileId') ;
        console.log('profile id = ' + profileId) ;
        const states = States.find({}) ;
        //var profileId  = this.props.params.profileId ;
        var profile = Profiles.findOne({_id: profileId}) ;
        
        console.log('Profile: \n' + profile) ;
        this.state = {
            profile: profile,
            states : states ,
            errors : errors,
            profileId : profileId,

            dob : '',
            gender : '',
            occupation : '',
            ngstate : '',
            address : '',
            doc : '',
            pdf : '',



        }

    }


    uploadFileLocal(file)
    {
        var uploaded_image_id ;
        Images = new FS.Collection('images', {stores: new FS.Store.FileSystem('images', {path: '~/uploads'})}) ;

        Images.allow({
            'insert' : function () {
                return true ;
            }}
        );

        Images.insert(file, function (error, fileObj) {
            uploaded_image_id = fileObj._id ;
        });

        return uploaded_image_id ;
    }

    uploadMyFilesLocal()
    {
        

        that = this ;
        
        

        
        var imgUrl = this.state.profile.imageUrl ;
        var profileId = this.state.profileId;
        var state = $('#ngstate').val().trim() ;
        var address  =  $('#address').val().trim() ; 
        
        //console.log('state profileId = '+ profileId) ;

        Profiles.update(that.state.profileId, {$set: { completed:true,state: state, address: address }}) ;
        //image url upload does not work well on client therefore it is placed on the server methods
        Meteor.call('uploadImageFromUrl', imgUrl, profileId) ;
        
        
        DOC.insert($('#doc').get(0).files[0], function (error, fileObj) {
            if(error){

            }else {
                var  letter = { url : '/cfs/files/doc/' + fileObj._id} ;
                Profiles.update(that.state.profileId, {$set: { letter }}) ;
               
            }

        });

        PDF.insert($('#pdf').get(0).files[0], function (error, fileObj) {

            if(error){

            }else {
                var  certificate = { url : '/cfs/files/pdf/' + fileObj._id} ;
                Profiles.update(that.state.profileId, {$set: { certificate }}) ;

            }
        });

        
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

        //var messages = '' ;
        var dob = $('#dobs').val().trim() ;
        var gender = $('#gender').val().trim() ;
        var ngstate = $('#ngstate').val().trim() ;
        var occupation = $('#occupation').val().trim() ;
        var address = $('#address').val().trim() ;
        var doc = ReactDOM.findDOMNode(this.refs.doc).value ;
        var pdf = ReactDOM.findDOMNode(this.refs.pdf).value ;

        //console.log(' from validation ' + ngstate) ;
        this.setState(
            {
                dob:dob,
                gender:gender,
                ngstate:ngstate,
                occupation:occupation,
                address: address,
                doc: doc,
                pdf: pdf,
            }
        );

        let docEle = $('#doc') ;
        let pdfEle = $('#pdf') ;

        let formValid = true ; // assume all forms field are valid

        let dobValidation = validateDate(dob, 'DD/MM/YYYY', 'Date of Birth') ;
        let genderValidation = validateFilled(gender, 'Gender') ;
        let ngstateValidation = validateFilled(ngstate,  'State') ;
        let occupationValidation = validateFilled(occupation,  'Occupation') ;
        let addressValidation = validateFilled(address, 'Address') ;

        let docFileValidation =  validateWordDoc(docEle, 'Intro letter') ;
        let pdfFileValidation =  validatePdfDoc(pdfEle, 'BirthCert') ;
        

        if(dobValidation.valid == false)
        {
           
            this.state.errors.push(dobValidation.message)   ;
            $('#dobs').closest('.form-group').addClass('has-error') ;

            formValid = false ;
           
        }

        if(genderValidation.valid === false)
        {
           // messages += genderValidation.message + '\n' ;
            this.state.errors.push(genderValidation.message)   ;
            $('#gender').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }

        if(ngstateValidation.valid === false)
        {
            //messages += ngstateValidation.message + '\n' ;
            this.state.errors.push(ngstateValidation.message)   ;
            $('#state').closest('.form-group').addClass('has-error') ;

            formValid = false ;
        }
        if(occupationValidation.valid === false)
        {
            //messages += occupationValidation.message + '\n' ;
            this.state.errors.push(occupationValidation.message)   ;
            $('#occupation').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }

        if(addressValidation.valid === false)
        {
            //messages += addressValidation.message + '\n' ;
            this.state.errors.push(addressValidation.message)   ;
            $('#address').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }


        if(docFileValidation.valid === false)
        {
            //messages += docFileValidation.message + '\n' ;
            this.state.errors.push(docFileValidation.message)   ;
            $('#doc').closest('.form-group').addClass('has-error') ;
            formValid = false ;
        }

        if(pdfFileValidation.valid === false)
        {

            //messages += pdfFileValidation.message + '\n' ;
            this.state.errors.push(pdfFileValidation.message)   ;
            $('#pdf').closest('.form-group').addClass('has-error') ;
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

        $('#submit-btn').button('loading') ;

        this.uploadMyFilesLocal() ;

        $('#submit-btn').button('reset') ;



        Session.set('profileId', this.state.profileId) ;
        this.props.history.push('/application') ;

    }   


    renderNigerianStates()
    {
        let states = this.state.states ;

        return states.map((state) => (
            <option key={state._id} value={state.name}>{state.name}</option>
        ) ) ;
    }

    
   
    render()
    {
        return(

             <div className="">
                 
                 <div className="panel_container">
                 <div className="panel panel-default" style={{marginTop:20}}>
                     <div className="page-header">
                        Please Complete Your Profile
                     </div>
                     <div className="panel-body">
                         <div className="row">
                             <div className="col-sm-6">
                                 <img src={this.state.profile.imageUrl == null ? '/img/avatar.png' : this.state.profile.imageUrl} className="img img-rounded"  alt="profile" width={200} height={150}/>
                             </div>
                             <div className="col-sm-6">
                                 <table className="borderless_table">
                                     <tbody>
                                        <tr>
                                            <td>Firstname : </td>
                                            <td>{this.state.profile.firstname}</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Surname   :</td>
                                            <td>{this.state.profile.lastname} </td>

                                        </tr>
                                        <tr>
                                            <td>Email     : </td>
                                            <td>{this.state.profile.email}</td>

                                        </tr>
                                     </tbody>
                                 </table>    
                                 

                             </div>
                         </div>
                         <hr className="divider"/>
                         <div className=" alert-danger" id="error-alert">
                             <ul id="error-list">
                                 
                             </ul>
                         </div>
                         <div>
                             <form role="form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="row">

                                    <div className="col-sm-6">

                                        <div className="form-group">
                                            <label  className="control-label">Date of Birth: * </label>
                                            <input type="text" ref="dobs" id="dobs"  className="form-control" placeholder="DD/MM/YYYY" tabIndex="1"/>
                                        </div>

                                        <div className="form-group">
                                            <label  className="control-label">Select Gender: * </label>
                                            <select name="gender" id="gender" ref="gender" className="form-control " placeholder="Select Gender" tabIndex="2">
                                                <option value="">Select...</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>


                                            </select>

                                        </div>

                                        <div className="form-group">
                                            <label  className="control-label">Select State: * </label>
                                            <select name="ngstate" ref="ngstate" id="ngstate" className="form-control " placeholder="State" tabIndex="3">
                                                <option value="">Select...</option>

                                                {this.renderNigerianStates()}

                                            </select>

                                        </div>

                                        <div className="form-group">
                                            <label  className="control-label">Occupation: * </label>
                                            <input type="text" name="occupation" id="occupation" ref="occupation" className="form-control" placeholder="occupation" tabIndex="4"/>
                                        </div>

                                    </div>

                                     <div className="col-sm-6">

                                         <div className="form-group">
                                             <label  className="control-label">Contact-Address: * </label>
                                             <textarea className="form-control" rows="3" name="address" id="address" ref="address" tabIndex="5" placeholder="Address"/>

                                         </div>
                                         <div className="form-group">
                                             <label  className="control-label">Select Intro. Letter(doc/docx): * </label>
                                             <input type="file" name="doc" ref="doc" id="doc" className="form-control" placeholder="doc" tabIndex="7" />
                                         </div>

                                         <div className="form-group">
                                             <label  className="control-label">Select BirthCert(pdf): * </label>
                                             <input type="file" name="pdf" id="pdf" ref="pdf" className="form-control" placeholder="pdf" tabIndex="8" />
                                         </div>

                                     </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <button id="submit-btn" className="btn btn-success" type="submit">Submit</button>
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