import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import * as consts from './constants';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

const Locations = () => 
  <div>
    <Navbar title="Locations"/>
    locations
  </div>;

const Categories = () => 
  <div>
    <Navbar title="Categories"/>
    categories
  </div>;

class App extends Component {
  render() {
    return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path={consts.LOCATIONS_ROUTE} component={Locations} />
            <Route path={consts.CATEGORIES_ROUTE} component={Categories} />
            <Redirect from="/" to={consts.LOCATIONS_ROUTE} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
