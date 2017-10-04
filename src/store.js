import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import rootReducer from './reducers/root';

import { save } from './storage'; 

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

store.subscribe(() => {
    const state = store.getState();
    console.log('saving', state, 'to local storage');
    save(state);
});

const MyLocationsStoreProvider = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default MyLocationsStoreProvider;