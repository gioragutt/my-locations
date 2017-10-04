import React from 'react'

import { Marker, InfoWindow } from 'react-google-maps';
import { toGoogleMapsCoordinates } from './LocationMarker';
import { Button } from 'react-bootstrap';

const ActionMarker = ({coordinates, title, onClick, onCloseClick}) => {
    return (
        <Marker position={toGoogleMapsCoordinates(coordinates)}>
            <InfoWindow onCloseClick={onCloseClick}>
                <Button onClick={onClick}>
                    {title}
                </Button>
            </InfoWindow>
        </Marker>
    );
};

export default ActionMarker;