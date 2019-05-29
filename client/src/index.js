import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import qs from 'query-string';

import App from './ApolloApp';
import { initializeTagManager } from './util/trackingUtils';
import { flattenMessages } from './util/flattenMessages';
import messages from './messages';
import history from './history';

addLocaleData([...en, ...es]);

initializeTagManager();

const params = qs.parse(history.location.search);
const locale = params.lang ? params.lang : 'en';

ReactDOM.render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <App />
    </IntlProvider>,
    document.getElementById('root')
);
