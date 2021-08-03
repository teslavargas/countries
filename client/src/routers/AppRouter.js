import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Cards from '../components/countryCards/Cards';
import LandingPage from '../components/landingPage/LandingPage';
import CountryDetails from '../components/countryDetails/CountryDetails'; 
import Activity from '../components/activities/Activity.jsx';
import About from '../components/about/About';

export const AppRouter = () => {
    return (
        <Router> 
            <div>
                <Switch> 
                    <Route 
                        exact 
                        path="/" 
                        component={ LandingPage } 
                        
                    />
                    
                    <Route
                        path="/home" 
                        component={ Cards } 
                        
                    />

                    <Route
                        exact
                        path="/countries/:id"
                        render={(match) => (
                                <React.Fragment>
                                    <CountryDetails match={match}></CountryDetails>
                                </React.Fragment>
                            )} 
                    /> 

                    <Route 
                        exact 
                        path="/create-activity"
                        component={ Activity }
                    />    

                    <Route 
                        exact
                        path="/about"
                        component={ About }
                    />

                   
                            

                </Switch>
            </div>
        </Router>
    )
}