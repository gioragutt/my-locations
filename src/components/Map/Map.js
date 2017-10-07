import React from 'react';
import PropTypes from 'prop-types'

import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { GOOGLE_MAPS_API_KEY, PLACEHOLDER_COORDINATES } from '../../constants';
import { toGoogleMapsCoordinates } from './geolocation';

const googleMapURL =
  `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`;

const Map = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({
  children,
  defaultZoom = 8,
  defaultCenter = toGoogleMapsCoordinates(PLACEHOLDER_COORDINATES),
  mapRef,
  ...props
}) => (
  <GoogleMap
    ref={mapRef}
    defaultZoom={defaultZoom}
    defaultCenter={defaultCenter}
    {...props}
  >
    {children}
  </GoogleMap>
));

Map.propTypes = {
  mapRef: PropTypes.func,
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  children: PropTypes.any
};

export default Map;