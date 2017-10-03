import React, { Component } from 'react';
import './App.css';

import Footer from '../Footer';
import Categories from '../../containers/Categories';
import Locations from '../../containers/Locations';

import { CATEGORIES_ROUTE, LOCATIONS_ROUTE } from '../../constants';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path={LOCATIONS_ROUTE} component={Locations} />
            <Route path={CATEGORIES_ROUTE} component={Categories} />
            <Redirect from="/" to={LOCATIONS_ROUTE} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
