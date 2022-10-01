import { Router, Switch, Route } from "react-router-dom";
import './App.css';

import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import HomePage from "./views/HomePage";
import AdminUserPage from "./views/AdminUserPage";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import Dashboard from "./views/Dashboard";
import { PrivateRoute, ProtectFromLoggedInUser, AdminRoute, UserOfferRoute, UserScheduleRoute } from "./services/ProtectedRoute";
import history from "./utils/history";
import ResetPasswordPage from "./views/ResetPasswordPage";
import Notification from "./services/NotificationService";
import OfferCreation from "./views/offerCreation/OfferCreation";
import Profile from "./components/profile/profile";
import ChangePassword from "./components/profile/changePassword/changePassword";
import phoneVerification from "./components/PhoneVerification/phoneVerification";
import Metrics from "./views/Metrics";
import Schedule from "./views/Schedule";
import Firebase from "./components/firebase/firebase_configure";
import NotFoundPage from "./views/NotFoundPage";
import EmailVerification from "./views/emailVerification";



function App() {
  return (
    <Router history={history}>
        <Notification  />
        <Switch>

            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/profile/changePassword/" exact component={ChangePassword} />
            <PrivateRoute path="/phoneVerification" exact component={phoneVerification} />
            <PrivateRoute path="/firebase" exact component={Firebase} />
            
            
            <ProtectFromLoggedInUser path="/signup" exact component={SignupPage} />
            <ProtectFromLoggedInUser path="/login" exact component={LoginPage} />
            <ProtectFromLoggedInUser path="/forgot-password" exact component={ForgotPasswordPage} />
            <ProtectFromLoggedInUser path="/reset-password" exact component={ResetPasswordPage} />


            <UserOfferRoute path="/offerCreation" exact component={OfferCreation} />
            <UserScheduleRoute path="/schedule" exact component={Schedule} />


            <AdminRoute path="/admin/metrics" exact component={Metrics} />
            <AdminRoute path="/admin/user" exact component={props => <AdminUserPage {...props} />} />
            <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
        
            <Route path="/emailverification/:name" component={EmailVerification} />
            <Route component={NotFoundPage} />

        </Switch>
    </Router>
  );
}

export default App;