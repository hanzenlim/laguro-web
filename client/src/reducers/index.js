import { combineReducers } from 'redux';
import dentistsReducer from './dentistsReducer';
import filtersReducer from './filtersReducer';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  dentists: dentistsReducer,
  filters: filtersReducer,
  form: reduxFormReducer
});
