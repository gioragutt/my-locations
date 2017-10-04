import React from 'react';

import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCxOXDhf6CAQsPQC7MHxazygFIxjTAFYsE',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({children, defaultZoom = 8, defaultCenter = { lat: 33, lng: 33 }, mapRef}) => (
  <GoogleMap
    ref={mapRef}
    defaultZoom={defaultZoom}
    defaultCenter={defaultCenter}
  >
    {children}
  </GoogleMap>
));

export default Map;