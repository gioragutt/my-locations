import React from 'react'

import { Marker, InfoWindow } from 'react-google-maps';
import { toGoogleMapsCoordinates } from './LocationMarker';
import { Button } from 'react-bootstrap';

const ActionMarker = ({coordinates, description, action, onClick, onCloseClick}) => {
    return (
        <Marker position={toGoogleMapsCoordinates(coordinates)}>
            <InfoWindow onCloseClick={onCloseClick}>
                <div>
                    {description}
                    <Button onClick={onClick}>
                        {action}
                    </Button>
                </div>
            </InfoWindow>
        </Marker>
    );
};

export default ActionMarker;