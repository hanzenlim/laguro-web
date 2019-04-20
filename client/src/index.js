import React from 'react';
import ReactDOM from 'react-dom';
import App from './ApolloApp';
import { initializeTagManager } from './util/trackingUtils';

initializeTagManager();

ReactDOM.render(<App />, document.getElementById('root'));
