import React, {Component} from 'react' ;
import {Grid, Jumbotron, Image, Row, Col } from 'react-bootstrap' ;
import {ReactDOM} from 'react-dom' ;



export default class NotFound extends Component{


    render()
    {
        return(
            
             <Grid>
                 <Row>
                     <div className="center_content feature_box">
                         <h1 style={{color:'white'}}>404! Page Not Found...</h1>
                         <img className="img img-responsive center_box" src={'/img/404.gif'} width="200" />
                     </div> 
                             

                     
                     </Row>
             </Grid>

        ) ;
    }
    
    

}