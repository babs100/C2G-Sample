import React, {Component, PropTypes} from 'react' ;

import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor' ;


export default class Login extends Component{

    constructor(props)
    {
        super(props) ;
        this.state = {
            errors : [],
            
        }

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

    handleLogin(e)
    {
        e.preventDefault() ;
        this.clearErrors(); // if any

        const that = this ;
        var email = $('#email').val() ;
        var password = $('#password').val() ;

        let formValid = true ; // assume all forms field are valid

        let emailValidation = validateFilled(email, 'Email') ;
        let passwordValidation = validateFilled(password, 'Password') ;

        if(emailValidation.valid == false)
        {

            this.state.errors.push(emailValidation.message)   ;
            $('#email').closest('.form-group').addClass('has-error') ;

            formValid = false ;

        }

        if(passwordValidation.valid == false)
        {

            this.state.errors.push(passwordValidation.message)   ;
            $('#password').closest('.form-group').addClass('has-error') ;

            formValid = false ;

        }

        if(formValid)
        {
            Meteor.loginWithPassword(email, password, function (error) {
                if(error)
                {
                    that.state.errors.push(error) ;
                    that.showErrors() ;
                }
                else {
                    var user = Meteor.user() ;
                    if(user.profile.userType == 2) // reviewer account
                    {
                        that.props.history.push('/review') ;
                    }else if(user.profile.userType == 3) // processor account
                    {
                        that.props.history.push('/process') ;
                    }

                }
            }) ;
        }
        else{
            this.showErrors() ;
        }
    }
    
   
    render()
    {
        return(

             
                 
                 <div className="login_panel">
                 <div className="panel panel-default "  >
                     <div className="page-header">
                        Administration Login
                     </div>
                     <div className="panel-body">
                         <div>
                             <form role="form" onSubmit={this.handleLogin.bind(this)}>
                                <div className="row">

                                    <div className="col-sm-12">
                                        <div className=" alert-danger" id="error-alert">
                                            <ul id="error-list">

                                            </ul>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label  className="control-label">Email: * </label>
                                            <input type="text" name="email" id="email" ref="score" className="form-control" placeholder="Email" tabIndex="1"/>
                                        </div>
                                        <div className="form-group">
                                            <label  className="control-label">Password: * </label>
                                            <input type="password" name="password" id="password" ref="password" className="form-control" placeholder="Password" tabIndex="2"/>
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit" >Login In</button>
                                        </div>

                                        
                                    </div>


                                 </div>


                             </form>
                         </div>


                     </div>
                 </div>
                 </div>   
             




        ) ;
    }
    
    

}