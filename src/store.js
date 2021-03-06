import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'

import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'

import rootReducer from './reducers/root';
import * as myLocationsStorage from './storage';
import { initializeCategories } from './actions/categories';
import { initializeLocations } from './actions/locations';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            logger
        )
    )
);

store.subscribe(() => {
    const state = store.getState();
    myLocationsStorage.save(state);
});

const { categories, locations } = myLocationsStorage.load();
store.dispatch(initializeCategories(categories || []));
store.dispatch(initializeLocations(locations || []));

const MyLocationsStoreProvider = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default MyLocationsStoreProvider;