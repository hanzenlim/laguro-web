import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import dentistsReducer from './dentistsReducer';
import officesReducer from './officesReducer';
import listingsReducer from './listingsReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import filtersReducer from './filtersReducer';
import reviewsReducer from './reviewsReducer';
import reservationsReducer from './reservationsReducer';

export default combineReducers({
    dentists: dentistsReducer,
    listings: listingsReducer,
    offices: officesReducer,
    filters: filtersReducer,
    reviews: reviewsReducer,
    reservations: reservationsReducer,
    auth: authReducer,
    ui: uiReducer,
    form: reduxFormReducer,
});
