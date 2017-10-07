import React from 'react';
import PropTypes from 'prop-types'

import { CoordinatesPropTypes } from '../Locations/util';

import { Marker, InfoWindow } from 'react-google-maps';
import { toGoogleMapsCoordinates } from './geolocation';
import { Button } from 'react-bootstrap';

const AdditionMarker = ({
    coordinates,
    address,
    onClick,
    onCloseClick
}) => {
    return (
        <Marker position={toGoogleMapsCoordinates(coordinates)}>
            <InfoWindow onCloseClick={onCloseClick}>
                <div>
                    {
                        address &&
                        <div>
                            <b>Address:</b>{' '}
                            {address}
                        </div>
                    }
                    <div>
                        <b>Coordinates:</b>{' '}
                        {coordinates.lat}, {coordinates.long}
                    </div>
                    <Button onClick={onClick}>
                        Add
                    </Button>
                </div>
            </InfoWindow>
        </Marker>
    );
};

AdditionMarker.propTypes = {
    coordinates: CoordinatesPropTypes.isRequired,
    address: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCloseClick: PropTypes.func.isRequired
};

export default AdditionMarker;