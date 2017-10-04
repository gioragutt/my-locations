import React from 'react';

import { Link } from 'react-router-dom';
import { Navbar, Button, Glyphicon } from 'react-bootstrap';

import { CATEGORIES_ROUTE, LOCATIONS_ROUTE } from '../constants';

const GlyphLink = ({icon, path, currentRoute}) => (
  <Link to={path}>    
    <Button bsStyle={currentRoute === path ? 'primary' : 'default'}>
      <Glyphicon glyph={icon}></Glyphicon>
    </Button>
  </Link>
);

const Footer = ({currentRoute}) => (
  <Navbar fixedBottom>
    <footer className="footer">
      <GlyphLink path={LOCATIONS_ROUTE} icon="map-marker" currentRoute={currentRoute}/>
      {' '}
      <GlyphLink path={CATEGORIES_ROUTE} icon="tag" currentRoute={currentRoute}/>
    </footer>
  </Navbar> 
);

export default Footer;