import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

let store;

if (process.env.NODE_ENV === 'production') {
    store = createStore(
        reducers,
        applyMiddleware(reduxThunk),
    );
} else {
    store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(reduxThunk),
    );
}

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root'),
);