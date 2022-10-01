import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import authService from './AuthService';

import Notification from "./NotificationService";

/**
 * 
 * @param {*} Component 
 * @returns Private
 * @description Prevent from not logged in user
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.currentUser();
        if (currentUser === false) {

            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        else
            return <Component {...props} />
    }} />
);

/**
 * 
 * @param {*} Component 
 * @returns ProtectFromLoggedInUser
 * @description Protect Route from already login User
 */
const ProtectFromLoggedInUser = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.currentUser();
        if (currentUser) {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
        else
            return <Component {...props} />
    }} />
);

/**
 * 
 * @param {*} Component 
 * @returns AdminRoute
 * @description Return Admin component only if logged in user is Admin
 */
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUserRole = authService.getCurrentUserRole();
        if (currentUserRole === "admin") {
            return <Component {...props} />
        }
        else {
            Notification.show({
                "status": false,
                "message": "Protected route accessed by admin"
            })
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
    }} />
);

/**
 * 
 * @param {*} Component 
 * @returns AdminRoute
 * @description Return Offer component only if logged in user has Offer Role
 */
const UserOfferRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUserRole = authService.getCurrentUserRole();
        if (currentUserRole === "offer") {
            return <Component {...props} />
        }
        else {
            Notification.show({
                "status": false,
                "message": "Protected route accessed by offer creator"
            })
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
    }} />
);

/**
 * 
 * @param {*} Component 
 * @returns AdminRoute
 * @description Return Offer component only if logged in user has Schedule Role
 */
const UserScheduleRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUserRole = authService.getCurrentUserRole();
        if (currentUserRole === "schedule") {
            return <Component {...props} />
        }
        else {
            Notification.show({
                "status": false,
                "message": "Protected route accessed by Scheduler"
            })
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
    }} />
);

export {
    PrivateRoute,
    ProtectFromLoggedInUser,
    AdminRoute,
    UserOfferRoute,
    UserScheduleRoute
}