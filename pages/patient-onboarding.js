import React, { useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContext } from '~/appContext';
// import KioskPage from '~/routes/KioskPage';
// import history from '~/util/browserHistory';
// import history from '~/util/browserHistory';

// const history = dynamic(() => import('~/util/browserHistory'), {
//     ssr: false,
// });

const PatientWebOnboardingPage = dynamic(
    () => import('../routes/PatientWebOnboardingPage'),
    {
        ssr: false,
    }
);

function App() {
    const { isAuth, mounted } = useContext(AppContext);

    // if (!mounted) return null;

    // return <KioskPage />;

    // useEffect(() => {
    //     const redirectToHome = () => {
    //         if (!isAuth) {
    //             window.location.href = '/';
    //         }
    //     };

    //     redirectToHome();
    // }, [isAuth]);

    if (!mounted) return null;

    return (
        <Router>
            <Switch>
                <Route
                    path="/patient-onboarding"
                    component={PatientWebOnboardingPage}
                />
                {/* <Route component={KioskPage} /> */}
                {/* <Route
                    path="/dashboard/dentist-profile"
                    component={DentistProfilePage}
                /> */}
            </Switch>
        </Router>
    );
}

export default App;
