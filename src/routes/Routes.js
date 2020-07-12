import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../views/User/Register';
import Login from '../views/User/Login';
import Dashboard from '../views/Dashboard/Dashboard';

class Routes extends Component {
    render() {
        return (
        <div>
            <Route exact path = "/register" component = {Register}></Route>
            <Route exact path = "/dashboard" component = {Dashboard}></Route>
            <Route exact path = "/" component = {Login}></Route>
            
        </div>
        );
    }
}
export default Routes;