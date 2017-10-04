import React from 'react'

import { Map, ActionMarker, LocationMarker } from '../Map';

const LocationsMap = ({
    locations,
    selectedLocation,
    mapRef,
    onRightClick,
    locationClicked,
    additionCoordinate,
    onAdditionClick,
    onAdditionCancel,
    locationInfoClosed
}) => (
    <Map
        mapRef={mapRef}
        onRightClick={onRightClick}
    >
        { 
            additionCoordinate &&
            <ActionMarker
                coordinates={additionCoordinate}
                onClick={onAdditionClick}
                onCloseClick={onAdditionCancel}
                title={`Add Location at ${additionCoordinate.lat}, ${additionCoordinate.long}`}
            />
        }
        {
            locations.map(loc => (
                <LocationMarker
                    key={loc.id}
                    location={loc}
                    onClick={locationClicked}
                    onCloseClick={locationInfoClosed}
                    isSelected={selectedLocation && loc.id === selectedLocation.id}
                />
            ))
        }
    </Map>
);

export default LocationsMap;