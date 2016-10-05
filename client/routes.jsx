import React from 'react' ;
import {Router,Route,IndexRoute, hashHistory,browserHistory} from 'react-router' ;

import App from '../import/ui/App.jsx' ;
import Home from '../import/ui/Home.jsx' ;
import Profile from '../import/ui/Profile.jsx' ;
import NotFound from '../import/ui/NotFound.jsx' ;
import ApplicationForm from '../import/ui/ApplicationForm.jsx' ;
import AppStatus from '../import/ui/AppStatus.jsx' ;
import Login from '../import/ui/Login.jsx' ;
import ReviewHome from '../import/ui/ReviewHome.jsx' ;
import ProcessHome from '../import/ui/ProcessHome.jsx' ;
import GoogleMap from '../import/ui/GoogleMap.jsx' ;

export const renderRoutes = () => (

    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={Home} />
            <Route  path="/profile" component={Profile} />
            <Route  path="/application" component={ApplicationForm} onEnter={ApplicationForm.guard}/>
            <Route  path="/login" component={Login} />
            <Route  path="/status" component={AppStatus} />
            <Route  path="/review" component={ReviewHome} onEnter={ReviewHome.guard} />
            <Route  path="/process" component={ProcessHome} onEnter={ProcessHome.guard} />
            <Route  path="/map" component={GoogleMap} />
            <Route  path="*" component={NotFound} />
        </Route>
    </Router>
) ;


