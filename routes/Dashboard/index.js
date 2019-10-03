import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import DentistDashboardPage from './DentistDashboardPage';
import PatientDashboardPage from './PatientDashboardPage';
import HostDashboardPage from './HostDashboardPage';
import { usePrivateApp } from '../../util/authUtils';

export const history = createBrowserHistory();

function Dashboard() {
    const { isRouteAccessible } = usePrivateApp();

    return isRouteAccessible ? (
        <Router basename="/dashboard">
            <Switch>
                <Route path="/dentist" component={DentistDashboardPage} />
                <Route path="/patient" component={PatientDashboardPage} />
                <Route path="/host" component={HostDashboardPage} />
            </Switch>
        </Router>
    ) : null;
}

export default Dashboard;
