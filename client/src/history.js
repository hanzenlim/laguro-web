import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import { gaTrackingId } from './config/keys';

ReactGA.initialize(gaTrackingId, {
    debug: process.env.NODE_ENV !== 'production',
});

const history = createHistory();

// Tracks the page load.
ReactGA.set({ page: window.location.pathname + window.location.search });
ReactGA.pageview(window.location.pathname + window.location.search);

// Tracks the subsequest page navigation.
history.listen(location => {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.pageview(location.pathname);
});

export default history;
