import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';

import { CATEGORIES_ROUTE, LOCATIONS_ROUTE } from '../constants';

const GlyphLink = ({icon, path}) => (
  <Link to={path}>    
    <Button>
      <Glyphicon glyph={icon}></Glyphicon>
    </Button>
  </Link>
);

export default () => (
  <footer className="footer">
    <div className="container">
      <GlyphLink path={LOCATIONS_ROUTE} icon="map-marker" />
      {' '}
      <GlyphLink path={CATEGORIES_ROUTE} icon="tag" />
    </div>
  </footer> 
);
