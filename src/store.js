import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import rootReducer from './reducers/root';

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

export default ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);