import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import MyLocationsStoreProvider from './store';

// THIS SHOULD DEFINITLY NOT BE HERE
// THIS IS A WORKAROUND FOR REACT16 DESTROYING BOOTSTRAP's MODAL
import { Modal } from 'react-overlays';

Modal.prototype.componentWillMount = function () {
    this.focus = () => {};
};
// REMOVE THIS ASA https://github.com/react-bootstrap/react-bootstrap/issues/2812 is fixed!

ReactDOM.render(
    <MyLocationsStoreProvider>
        <App />
    </MyLocationsStoreProvider>,
    document.getElementById('root')
);
registerServiceWorker();
