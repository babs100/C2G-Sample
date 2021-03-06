import React, {Component, PropTypes} from 'react' ;
import {SplitButton, MenuItem} from 'react-bootstrap' ;
import {Applications} from '../collections/application.js' ;
import {Profiles} from '../collections/profile.js' ;

export default class Apps  extends Component
{
    
    reviewApproval()
    {
        Applications.update(this.props.app._id, { $set : {reviewStatus : 1}}) ;
    }

    reviewRejected()
    {
        Applications.update(this.props.app._id, { $set : {reviewStatus : 2}}) ;
    }

    render()
    {
        const sn = this.props.sno ;
        const app = this.props.app;
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

        }

        return (
            <tr>

                <td>{sn}</td>
                <td>{app.type}</td>
                <td>{app.mode}</td>
                <td>{app.score}</td>
                <td>{app.state}</td>
                <td>{app.address}</td>
                <td>
                    {showStatus(app.reviewStatus)}
                </td>
                <td>
                    {showStatus(app.processStatus)}

                </td>
                <td>
                    <SplitButton title="Actions" className="action"  id={'split-butt-' + app._id}  onSelect={this.handleSplitButtonChange.bind(this)} >
                        <MenuItem eventKey="review" >Review Approved</MenuItem>
                        <MenuItem eventKey="reject" >Review Rejected</MenuItem>

                        <MenuItem divider />
                        <MenuItem eventKey="showreason" >Show Reason</MenuItem>
                        <MenuItem eventKey="viewletter">Preview AppLetter</MenuItem>
                        <MenuItem eventKey="viewcert">Preview Certificate</MenuItem>


                    </SplitButton>
                </td>



            </tr>
        );
    }

    handleSplitButtonChange(eventKey , target)
    {
        const profile = Profiles.findOne(this.props.app.profileId) ;
        const application_id =  this.props.app._id ;
        const reviewStatus =  this.props.app.reviewStatus ;
        
        if(eventKey === "review")
        {
            this.props.approvalHandler(application_id) ;

        }else if(eventKey === "reject")
        {
            this.props.rejectionHandler(application_id) ;
            
        }else if(eventKey === "showreason")
        {
            if(reviewStatus > 0)
            {
                alert('Review reason \n' + this.props.app.reviewReason) ;
                
            }else {
                
                alert('This application is still pending!') ;
            }
        }
        else if(eventKey === "viewletter")
        {
            window.open(profile.letter.url, '_blank');
            
        }else if(eventKey === "viewcert")
        {
            window.open(profile.certificate.url, '_blank');
        }
    }
    

            
    
            
    
}

Apps.propTypes = {
    sno:PropTypes.number.isRequired,
    approvalHandler:PropTypes.func.isRequired,
    rejectionHandler:PropTypes.func.isRequired,
    app:PropTypes.object.isRequired,
};