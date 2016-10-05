import React, {Component, PropTypes} from 'react' ;
import {Meteor} from 'meteor/meteor' ;
import {createContainer} from 'meteor/react-meteor-data' ;
import {Applications} from '../collections/application.js' ;
import Apps from './Apps.jsx' ;
import {Profiles} from '../collections/profile.js' ;

import {Modal, Nav, Grid, Glyphicon, NavItem, Table, SplitButton, MenuItem, Button} from 'react-bootstrap' ;


 class ReviewHome extends Component{

        constructor(props)
        {
                super(props) ;

                this.state = {
                    reviewStatus: 3,
                    selectedAppId : 0,
                    currentUser : Meteor.user(),

                };

                //var applications = Applications.find({});
            
                // bind this handler to this compenent before passing it to the children 
                // otherwise 'this' statement will refer to window or not found ;
                this.handleReviewApproval = this.handleReviewApproval.bind(this) ;
                this.handleReviewRejection = this.handleReviewRejection.bind(this) ;
                this.doApproval = this.doApproval.bind(this) ;
                this.doRejection = this.doRejection.bind(this) ;

                

                
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
             $('#profile_table').toggle() ;
         }
        
        getAppId()
        {
            return this.state.selectedAppId ;
        }

        toggleProfileTable(e)
        {
            e.preventDefault() ;
            $('#profile_table').toggle() ;
        }
     

         handleReviewApproval(app_id)   
         {
             this.setState(
                 {
                     selectedAppId: app_id,

                 }
             ) ;

            
             $('#approval_modal').show() ;
        
         }

         handleReviewRejection(app_id)
         {
             this.setState(
                 {
                     selectedAppId: app_id,

                 }
             ) ;
             
             $('#rejection_modal').show() ;
         }

         closeApprovalModal()
         {
             $('#approval_modal').hide() ;
         }

         closeRejectionModal() 
         {
             $('#rejection_modal').hide() ;
         }
     

         doApproval()
         {
             
             var reason = $('#approval_reason').val().trim();
             if(reason === '')
             {
                 $('#approval_reason').closest('.form-group').addClass('has-error') ;
                 return ;
             }
             
             var app_id = this.state.selectedAppId ;

             this.closeApprovalModal() ;
             
             //send mail to processor
             
             const from = 'C2G' ;
             const subject = 'C2G - Pending Application';
             const text = 'A pending application awaits you approval \n please attend to it \n\n Warm Regards';
             
             Meteor.call('sendEmailToProcessor', from, subject, text) ;
             //update application status
             Applications.update(app_id, {$set : {reviewStatus : 1, reviewReason : reason}}) ;
             
             
             
    
         }

         doRejection()
         {
    
             var reason = $('#rejection_reason').val().trim();
             if(reason === '')
             {
                 $('#rejection_reason').closest('.form-group').addClass('has-error') ;
                 return ;
             }

             var app_id = this.state.selectedAppId ;
             Applications.update(app_id, {$set : {reviewStatus : 2, reviewReason : reason}}) ;

             this.closeRejectionModal() ;
    
    
         }
     

     
     sortPending(e)
     {
         e.preventDefault() ;
         this.setState({reviewStatus:0});
     }

     sortApproved(e)
     {
         e.preventDefault() ;
         this.setState({reviewStatus:1});
     }

     sortRejected(e)
     {
         e.preventDefault() ;
         this.setState({reviewStatus:2});
     }

     sortAll(e)
     {
         e.preventDefault() ;
         this.setState({reviewStatus:3});
     }
     renderModal2()
     {
         return(
             <div>
                 <div className="modal" id="approval_modal">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h3>Approval Reason</h3>

                             </div>
                             <div className="modal-body">

                                 <div className="row">
                                     <div className="col-sm-10 col-sm-offset-1">
                                         <form   role="form" >

                                             <div className="form-group">
                                                 <label className="control-label">Reason for approval: * </label>

                                                        <textarea className="form-control " rows="3" name="approval_reason" id="approval_reason" >

                                                        </textarea>
                                             </div>


                                         </form>
                                     </div>


                                 </div>

                             </div>
                             <div className="modal-footer">

                                 <div className="pull-left"><button className="btn btn-success" onClick={this.doApproval}>Approve Application</button>
                                     <button type="button" className="btn btn-default" onClick={this.closeApprovalModal}>Close Form</button></div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="modal" id="rejection_modal">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h3>Rejection Reason</h3>

                             </div>
                             <div className="modal-body">

                                 <div className="row">
                                     <div className="col-sm-10 col-sm-offset-1">
                                         <form   role="form" >

                                             <div className="form-group">
                                                 <label className="control-label">Reason for rejection: * </label>

                                                        <textarea className="form-control " rows="3" name="rejection_reason" id="rejection_reason" >

                                                        </textarea>
                                             </div>


                                         </form>
                                     </div>


                                 </div>

                             </div>
                             <div className="modal-footer">

                                 <div className="pull-left">
                                     <button className="btn btn-success" onClick={this.doRejection}>Reject Application</button>
                                     <button type="button" className="btn btn-default" onClick={this.closeRejectionModal}>Close Form</button>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>   
             
         )
     }

     renderProfiles()
     {  
            var profiles = this.props.profiles ;
            var sn = 0 ;
            return ( profiles.map((profile) => (
                <tr key={profile._id}>
                    <td>{++sn}</td>
                    <td>{profile.firstname}</td>
                    <td>{profile.lastname}</td>
                    <td>{profile.email}</td>
                    <td>{profile.state}</td>
                    <td>{profile.address}</td>
                    
                </tr>    
            )) 
            );
         
     }
     
     
     renderApplications()
         {
                 var filteredApps = this.props.applications ;
                  var allApps = filteredApps ;  
                 

                    

                const showStatus = function (status) {
                    if (status === 0 )
                    {
                        return(<label className=' label label-warning'>pending</label>) ;
                    }else if(status === 1)
                    {
                        return(<label className='label label-success'>approved</label>) ;
                    }else {
                        return(<label className='label label-danger'>rejected</label>) ;
                    }
                    
                };
                 var sn = 0 ;
                
                 if(this.state.reviewStatus == 0)   
                 {
                     //pending applications
                     filteredApps = filteredApps.filter((app) => app.reviewStatus == 0);
                 }
                 else if(this.state.reviewStatus == 1)
                 {
                     //review approved
                     filteredApps = filteredApps.filter((app) => app.reviewStatus == 1);
                 }
                 else if(this.state.reviewStatus == 2)
                 {
                     //rejected
                     filteredApps = filteredApps.filter((app) => app.reviewStatus == 2);
                 }
                 else if(this.state.reviewStatus == 3)
                 {
                     filteredApps = allApps ;
                 }


                return filteredApps.map((app) => (

                             <Apps key={app._id} sno={++sn} app={app} approvalHandler={this.handleReviewApproval.bind(this)} rejectionHandler={this.handleReviewRejection.bind(this)}/>
                        )) ;
                 
                 /*
                 console.log(filteredApps);
                 if(this.state.renderMode === 1)
                 {
                         // check if reviewStatus == 1 i.e review approved
                         filteredApps = filteredApps.filter((application) => application.reviewStatus === 1) ;

                 }else if(this.state.renderMode === 2)
                 {
                         // check if reviewStatus == 1 i.e review rejected
                         filteredApps = filteredApps.filter((application) => application.reviewStatus === 2) ;

                 }else {

                         // show all application
                         filteredApps = filteredApps.filter((application) => application.completed == true) ;
                         console.log('at else '+ filteredApps);
                 }

                 return filteredApps.map((app) => (
                     <ApplicationReview key={app._id} sn={++sn} application={app}/>
                 )) ;
                 */
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

                const dash = (
                    <div className="well">
                            <div className="row ">
                                    <div className="col-sm-3">
                                            <a href="#" onClick={this.toggleProfileTable.bind(this)}>
                                                    <div className="ds-widget">
                                                            <div className="ds-icon"><Glyphicon glyph="user"/></div>
                                                            <div className="count">{this.props.profileCount}</div>
                                                            <div className="text">Total Registrant</div>
                                                    </div>

                                            </a>

                                    </div>
                                    <div className="col-sm-3">
                                            <a href="#" onClick={this.sortPending.bind(this)}>
                                                    <div className="ds-widget">
                                                            <div className="ds-icon"><Glyphicon glyph="th-list"/></div>
                                                            <div className="count">{this.props.pendingCount}</div>
                                                            <div className="text">Total Pending</div>
                                                    </div>

                                            </a>

                                    </div>
                                    <div className="col-sm-3">
                                            <a href="#" onClick={this.sortApproved.bind(this)}>
                                                    <div className="ds-widget">
                                                            <div className="ds-icon"><Glyphicon glyph="ok"/></div>
                                                            <div className="count">{this.props.reviewedCount}</div>
                                                            <div className="text">Total Approved</div>
                                                    </div>

                                            </a>

                                    </div>
                                    <div className="col-sm-3">
                                            <a href="#" onClick={this.sortRejected.bind(this)}>
                                                    <div className="ds-widget">
                                                            <div className="ds-icon"><Glyphicon glyph="remove"/></div>
                                                            <div className="count">{this.props.rejectedCount}</div>
                                                            <div className="text">Total Rejected</div>
                                                    </div>

                                            </a>

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
                                
                                <div id="profile_table" className="col-sm-12 table_container collapse in">
                                    <span className="">Profiles</span>
                                    <Table striped bordered>
                                        <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>FIRSTNAME</th>
                                            <th>LASTNAME</th>
                                            <th>EMAIL</th>
                                            <th>STATE</th>
                                            <th>ADDRESS</th>
                                            

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderProfiles()}


                                        </tbody>
                                    </Table>

                                </div>
                                    
                                    <div className="col-sm-12 table_container">
                                            <span className="">Applications</span>
                                            <Table striped bordered>
                                                    <thead>
                                                    <tr>
                                                            <th>SN</th>
                                                            <th>TYPE</th>
                                                            <th>MODE</th>
                                                            <th>SCORE</th>
                                                            <th>STATE</th>
                                                            <th>ADDRESS</th>
                                                            <th>REVIEWED</th>
                                                            <th>PROCESSED</th>
                                                            <th>ACTIONS</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.renderApplications()}


                                                    </tbody>
                                            </Table>

                                    </div>

                            </div>
                            {this.renderModal2()}
                            
                            
                                


                            


                    </div>  
                    




                ) ;
        }

    


}

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