import React, {useContext, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../../css/login.css";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/auth";
import {ErrorIndicator, Spinner} from "../components";
import { Redirect } from 'react-router-dom';
import {HOME} from "../constants/routes";
import {ServiceContext} from "../contexts";


const LoginContainer = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector(
        ({authReducer: {loading, error}}) => ({loading, error})
    );

    const {userService} = useContext(ServiceContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login(dispatch, {username, password});
    };


    if (userService.isLoggedIn()) {
        return <Redirect to={HOME} />;
    }

    if (loading) {
        return (<Spinner/>);
    }

    return (
        <div className="login">
            {error &&
                <div className="alert alert-danger" role="alert" style={{width: "30%", marginLeft: "35%"}}>
                    {error.message}
                </div>
            }
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginContainer;
