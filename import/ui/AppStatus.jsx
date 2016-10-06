import React, {Component, PropTypes} from 'react' ;
import {Well,Table} from 'react-bootstrap' ;
import {Applications} from '../collections/application.js' ;
import {Profiles} from '../collections/profile.js' ;


export default class Application extends Component{

    constructor(props)
    {
        super(props) ;
        //const profileId = Session.get('profileId');
        const profileId = window.sessionStorage.getItem('profileId') ;
        var application = Applications.findOne({profileId: profileId}) ;
        var profile = Profiles.findOne(profileId) ;
        var profile ;
        
        this.state = {
            application: application,
            profile: profile
        }
    }

    static guard(nextState, replace)
    {
        //const profileId = Session.get('profileId') ;
        const profileId = window.sessionStorage.getItem('profileId') ;
        const application = Applications.findOne({profileId:profileId}) ;

        console.log('called in guard : \n'+ profileId + ' \n' + application) ;
        
        if(!application )
        {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        }

    }


    handleDateChange(val)
    {
        this.setState({
            selectedDate:val
        });
        
    }
    
    showReviewStatusText(status)
    {
        var text ;
        if(status == 0)
        {
            text = 'Pending';
        }else if(status == 1)
        {
            text = 'Reviewed';
        }else if(status == 2)
        {
            text = 'Rejected';
        }
        
        return text ;
    }

    showProcessedStatusText(status)
    {
        var text ;
        if(status == 0)
        {
            text = 'Pending';
        }else if(status == 1)
        {
            text = 'Processed';
        }else if(status == 2)
        {
            text = 'Rejected';
        }

        return text ;
    }
   
    render()
    {
        return(

             <div className="">
                 
                  
                 <div className="status_box">
                     
                         <h2>Vehicle Licence Application Status</h2>
                         <Table>
                             <tbody>
                             <tr>
                                 <td><span className="lead"> Application Type</span></td>
                                 <td><span className="lead"> {this.state.application.type}</span></td>

                             </tr>

                             <tr>
                                 <td><span className="lead"> Applicant Name</span></td>
                                 <td><span className="lead"> {this.state.profile.firstname + ' ' + this.state.profile.lastname}</span></td>

                             </tr>
                             
                             <tr>
                                 <td><span className="lead"> Test Score</span></td>
                                 <td><span className="lead"> {this.state.application.score}</span></td>

                             </tr>
                             <tr>
                                 <td><span className="lead"> Application Mode</span></td>
                                 <td><span className="lead"> {this.state.application.mode}</span></td>

                             </tr>
                             
                             <tr>
                                 <td><span className="lead"> Review Status</span></td>
                                 <td><span className="lead"> {this.showReviewStatusText(this.state.application.reviewStatus)}</span></td>

                             </tr>

                             <tr>
                                 <td><span className="lead"> Proccess Status</span></td>
                                 <td><span className="lead"> {this.showProcessedStatusText(this.state.application.processStatus)}</span></td>

                             </tr>

                            
                             </tbody>
                         </Table>

                 </div>
                 
                 
             </div>




        ) ;
    }
    
    

}