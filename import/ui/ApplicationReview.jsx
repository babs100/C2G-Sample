import  React , {Component, PropTypes} from 'react' ;

import {Applications} from '../collections/application.js' ;
import {SplitButton, MenuItem} from 'react-bootstrap' ;

export default class ApplicationReview extends Component{

    handleSplitButtonChange(event , eventKey)
    {
        if(eventKey === "review")
        {
            this.approveReview() ;
        }else {
            this.rejectReview() ;
        }
    }

    render()
    {
        //return( <li> {this.props.task.text}</li>) ;
        //const  taskClassName = this.props.task.checked ? 'checked' : '' ;
        const renderActions = (
            <SplitButton title="Actions"  id="split-button-pull-right" onChange={this.handleSplitButtonChange.bind(this)}>
                <MenuItem eventKey="review">Review Approved</MenuItem>
                <MenuItem eventKey="2">Review Rejected</MenuItem>

            </SplitButton>
        );
           // console.log( 'application componenent = ' + this.props.application) ;
        return(

            <tr>
                <td></td>
                <td>{this.props.application.type}</td>
                <td>{this.props.application.mode}</td>
                <td>{this.props.application.score}</td>
                <td>{this.props.application.state}</td>
                <td>{this.props.application.address}</td>
                <td>{(() => {
                        switch (this.props.application.reviewStatus)
                        {
                            case 0 : return 'pending';
                            case 1 : return 'review';
                            case 2 : return 'rejected';
                        }
                    })}

                </td>
                <td>{(() => {
                    switch (this.props.application.processStatus)
                    {
                        case 0 : return 'pending';
                        case 1 : return 'review';
                        case 2 : return 'rejected';
                    }
                })}

                </td>
                <tv>
                    {renderActions}
                </tv>



            </tr>

        );
    }

    approveReview()
    {
        Applications.update(this.props.application._id, {$set: {reviewStatus:1}}) ;
    }

    rejectReview()
    {
        Applications.update(this.props.application._id, {$set: {reviewStatus:2}}) ;
    }

    approveProcess()
    {
        Applications.update(this.props.application._id, {$set: {processStatus:1}}) ;
    }

    rejectProcess()
    {
        Applications.update(this.props.application._id, {$set: {processStatus:2}}) ;
    }


}

ApplicationReview.propTypes = {
    application:PropTypes.object.isRequired,
    //sn:PropTypes.number.isRequired,
};