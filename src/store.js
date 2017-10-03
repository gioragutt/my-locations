import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import rootReducer from './reducers/root';

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

const MyLocationsStoreProvider = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default MyLocationsStoreProvider;