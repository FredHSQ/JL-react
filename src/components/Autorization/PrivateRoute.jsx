import React from "react";
import { isAuthenticated } from "./Auth";

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/Login', state: { from: props.location} }} />
        )
    )}/>
)

export default PrivateRoute;