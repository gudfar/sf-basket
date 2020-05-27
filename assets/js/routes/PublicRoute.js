import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {ServiceContext} from "../contexts";
import {HOME} from "../constants/routes";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const {userService} = useContext(ServiceContext);
    return (
        <Route {...rest} render={props => (
            userService.isLoggedIn() && restricted ?
                <Redirect to={HOME} />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
