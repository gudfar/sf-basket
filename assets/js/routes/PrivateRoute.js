import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {ServiceContext} from "../contexts";
import {LOGIN} from "../constants/routes";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {userService} = useContext(ServiceContext);
    return (
        <Route {...rest} render={props => (
            userService.isLoggedIn() ?
                <Component {...props} />
                : <Redirect to={LOGIN} />
        )} />
    );
};

export default PrivateRoute;
