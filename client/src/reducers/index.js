import { combineReducers } from 'redux';
import dentistsReducer from './dentistsReducer';
import officesReducer from './officesReducer';
import listingsReducer from './listingsReducer';
import authReducer from './authReducer';
import filtersReducer from './filtersReducer';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  dentists: dentistsReducer,
  listings: listingsReducer,
  offices: officesReducer,
  filters: filtersReducer,
  auth: authReducer,
  form: reduxFormReducer
});