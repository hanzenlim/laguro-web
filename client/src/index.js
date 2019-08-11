import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { InjectIntlContext } from '@comparaonline/react-intl-hooks';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import qs from 'query-string';
import App from './ApolloApp';
import { initializeTagManager } from './util/trackingUtils';
import messages from './messages.json';
import history from './history';
import cookies from 'browser-cookies';
import { KIOSK_REG_PAGE_URL } from './util/urls';
import { PURPOSE_OF_VISIT_WIZARD_STEP_ID } from './pages/KioskRegPage';

addLocaleData([...en, ...es]);

initializeTagManager();

const params = qs.parse(history.location.search);

if (
    !history.location.pathname.includes('/kiosk/') ||
    history.location.pathname.includes(
        `${KIOSK_REG_PAGE_URL}/${PURPOSE_OF_VISIT_WIZARD_STEP_ID}` ||
            history.location.pathname === KIOSK_REG_PAGE_URL
    )
) {
    const locale = params.lang ? params.lang : 'en';
    cookies.set('locale', locale, {
        expires: 0,
    });
}

const intlLocale = cookies.get('locale') || 'en';

ReactDOM.render(
    <IntlProvider locale={intlLocale} messages={messages[intlLocale]}>
        <InjectIntlContext>
            <App />
        </InjectIntlContext>
    </IntlProvider>,
    document.getElementById('root')
);
