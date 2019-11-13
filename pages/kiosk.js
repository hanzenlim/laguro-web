import React, { useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContext } from '~/appContext';

const KioskRegPage = dynamic(() => import('../routes/KioskRegPage'), {
    ssr: false,
});

const KioskPage = dynamic(() => import('../routes/KioskPage'), {
    ssr: false,
});

const KioskAppointmentCodeConfirmation = dynamic(
    () => import('~/routes/KioskAppointmentCodeConfirmation'),
    {
        ssr: false,
    }
);

const KioskOfficeSetUpPage = dynamic(
    () => import('../routes/KioskOfficeSetUpPage'),
    {
        ssr: false,
    }
);

function App() {
    const { mounted } = useContext(AppContext);

    if (!mounted) return null;

    return (
        <Router>
            <Switch>
                <Route path="/kiosk/registration" component={KioskRegPage} />
                <Route
                    path="/kiosk/office-setup"
                    component={KioskOfficeSetUpPage}
                />
                <Route
                    path="/kiosk/appointment-code-confirmation"
                    component={KioskAppointmentCodeConfirmation}
                />
                <Route path="/kiosk" component={KioskPage} />
            </Switch>
        </Router>
    );
}

export default App;
