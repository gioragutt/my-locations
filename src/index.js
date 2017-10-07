import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import MyLocationsStoreProvider, { history } from './store';

import './fixesForReactBugs';

ReactDOM.render(
    <MyLocationsStoreProvider>
        <App history={history}/>
    </MyLocationsStoreProvider>,
    document.getElementById('root')
);
registerServiceWorker();
