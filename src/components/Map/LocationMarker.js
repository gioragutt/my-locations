import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps'

export const toGoogleMapsCoordinates = coordinates => ({ lat: coordinates.lat, lng: coordinates.long });

const InfoRow = ({title, value}) => <div><b>{title}:</b> {value}</div>;

const LocationInfoWindow = ({location, onCloseClick}) => (
    <InfoWindow onCloseClick={onCloseClick}>
        <div>
            <InfoRow title="Name" value={location.name} />
            <InfoRow title="Address" value={location.address} />
            <InfoRow title="Category" value={location.category} />
            <InfoRow title="Location" value={`${location.coordinates.lat}, ${location.coordinates.long}`} />
        </div>
    </InfoWindow>
);

const LocationMarker = ({location, onClick, isSelected, onCloseClick}) => {
    return (
        <Marker
            position={toGoogleMapsCoordinates(location.coordinates)}
            label={location.name}
            onClick={() => onClick(location)}
        >
            {isSelected && <LocationInfoWindow location={location} onCloseClick={onCloseClick}/>}
        </Marker>
    );
};

export default LocationMarker;