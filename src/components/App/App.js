import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

import Categories from '../../containers/Categories';
import Locations from '../../containers/Locations';
import Footer from '../../containers/Footer';

import { CATEGORIES_ROUTE, LOCATIONS_ROUTE } from '../../constants';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
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
  }
}

export default App;
