import React, {Component, PropTypes} from 'react' ;
import {Grid, Jumbotron, Button, Glyphicon} from 'react-bootstrap' ;
import {Link} from 'react-router' ;

export default class Other extends Component{

    responseGoogle(response)
    {
        console.log(response) ;
    }

    render()
    {
        return(
            <Grid>
                <Jumbotron>
                    <h1> Other View</h1>
                    <p>This is an Example velicle licence application design for C2G. Follow the step below to complette application </p>
                    <ul>
                        <li>Login with gmail account and create a profile</li>
                        <li>Fill the Vehicle Licence application</li>
                        <li>Check back for application status</li>
                        <li>  <Link to="home" > Go Home</Link></li>
                    </ul>
                    
                </Jumbotron>
            </Grid>

        ) ;
    }



}