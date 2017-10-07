import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps'
import { ButtonGroup, Button } from 'react-bootstrap';

import { toGoogleMapsCoordinates } from './geolocation';

const InfoRow = ({title, value}) => {
    if (!value) {
        return null;
    }

    return (
        <div>
            <b>{title}:</b>
            {' '}
            {value}
        </div>
    );
};

const LocationInfoWindow = ({
    location,
    onCloseClick,
    onEdit,
    onRemove
}) => (
    <InfoWindow onCloseClick={onCloseClick}>
        <div>
            <InfoRow title="Name" value={location.name} />
            <InfoRow title="Address" value={location.address} />
            <InfoRow title="Category" value={location.category} />
            <InfoRow title="Location" value={`${location.coordinates.lat}, ${location.coordinates.long}`} />
            <ButtonGroup>
                <Button onClick={onEdit}>Edit</Button>
                <Button onClick={onRemove}>Remove</Button>
            </ButtonGroup>
        </div>
    </InfoWindow>
);

const LocationMarker = ({
    location,
    onClick,
    isSelected,
    onCloseClick,
    onEdit,
    onRemove
}) => (
    <Marker
        position={toGoogleMapsCoordinates(location.coordinates)}
        label={location.name}
        onClick={() => onClick(location)}
    >
        {
            isSelected &&
            <LocationInfoWindow
                location={location}
                onCloseClick={onCloseClick}
                onEdit={onEdit}
                onRemove={onRemove}
            />
        }
    </Marker>
);

export default LocationMarker;