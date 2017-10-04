import React from 'react'

import { Map, ActionMarker, LocationMarker } from '../Map';

const LocationsMap = ({
    locations,
    selectedLocation,
    mapRef,
    onRightClick,
    locationClicked,
    additionCoordinate,
    additionCoordinateAddress,
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
                description={
                    <div>
                        { additionCoordinateAddress && <div><b>Address:</b> {additionCoordinateAddress}</div> }
                        <div><b>Coordinates:</b> {`${additionCoordinate.lat}, ${additionCoordinate.long}`}</div>
                    </div>
                }
                action="Add"
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