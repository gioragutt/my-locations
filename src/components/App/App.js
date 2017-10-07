import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'

import './App.css';

import Categories from '../../containers/Categories';
import Locations from '../../containers/Locations';
import Footer from '../../containers/Footer';

import { CATEGORIES_ROUTE, LOCATIONS_ROUTE } from '../../constants';

const App = ({
  history
}) => (
  <ConnectedRouter history={history}>
    <div className="App">
      <Switch>
        <Route path={LOCATIONS_ROUTE} component={Locations} />
        <Route path={CATEGORIES_ROUTE} component={Categories} />
        <Redirect from="/" to={LOCATIONS_ROUTE} />
      </Switch>
      <Footer />
    </div>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.any.isRequired
};

export default App;
