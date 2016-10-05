import React , {Component,PropTypes } from 'react' ;
import {createContainer} from 'meteor/react-meteor-data' ;
import {render} from 'react-dom' ;



export default class MainDiv extends Component{
    
    
    render()
    {
        return (
            <div>
                {this.props.children}
            </div>
        ) ;
    }


   
}


/*
export default createContainer(() => 
{
    return {} ;
},Main) ;
    */