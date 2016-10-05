import React , {Component,PropTypes } from 'react' ;



export default class App extends Component{

 
    
    render()
    {
       return(this.props.children); 
    }


   
}

/*
export default createContainer(() =>
{
    return {} ;
},App) ;

*/